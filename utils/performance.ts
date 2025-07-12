"use client";

import React from "react";

// Core Web Vitals and Performance Monitoring Utilities

interface PerformanceMetric {
  name: string;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  timestamp: number;
}

interface WebVitalsMetric {
  id: string;
  name: "CLS" | "FID" | "FCP" | "LCP" | "TTFB" | "INP";
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  delta: number;
  navigationType: string;
}

// Core Web Vitals thresholds
const WEB_VITALS_THRESHOLDS = {
  CLS: { good: 0.1, poor: 0.25 },
  FID: { good: 100, poor: 300 },
  FCP: { good: 1800, poor: 3000 },
  LCP: { good: 2500, poor: 4000 },
  TTFB: { good: 800, poor: 1800 },
  INP: { good: 200, poor: 500 },
} as const;

// Performance observer for monitoring various metrics
class PerformanceMonitor {
  private metrics: Map<string, PerformanceMetric> = new Map();
  private observers: PerformanceObserver[] = [];

  constructor() {
    if (typeof window !== "undefined") {
      this.initializeObservers();
    }
  }

  private initializeObservers() {
    // Largest Contentful Paint (LCP)
    this.observeMetric("largest-contentful-paint", (entries) => {
      const lastEntry = entries[entries.length - 1];
      this.recordMetric("LCP", lastEntry.startTime);
    });

    // First Input Delay (FID)
    this.observeMetric("first-input", (entries) => {
      const firstEntry = entries[0];
      this.recordMetric(
        "FID",
        firstEntry.processingStart - firstEntry.startTime,
      );
    });

    // Cumulative Layout Shift (CLS)
    this.observeMetric("layout-shift", (entries) => {
      let clsValue = 0;
      for (const entry of entries) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      this.recordMetric("CLS", clsValue);
    });

    // Navigation timing
    this.observeNavigationTiming();
  }

  private observeMetric(entryType: string, callback: (entries: any[]) => void) {
    try {
      const observer = new PerformanceObserver((list) => {
        callback(list.getEntries());
      });
      observer.observe({ entryTypes: [entryType] });
      this.observers.push(observer);
    } catch (error) {
      console.warn(`Failed to observe ${entryType}:`, error);
    }
  }

  private observeNavigationTiming() {
    if ("navigation" in performance) {
      const navigation = performance.getEntriesByType(
        "navigation",
      )[0] as PerformanceNavigationTiming;

      // Time to First Byte (TTFB)
      const ttfb = navigation.responseStart - navigation.requestStart;
      this.recordMetric("TTFB", ttfb);

      // First Contentful Paint (FCP)
      const fcpEntry = performance.getEntriesByName(
        "first-contentful-paint",
      )[0];
      if (fcpEntry) {
        this.recordMetric("FCP", fcpEntry.startTime);
      }
    }
  }

  private recordMetric(name: string, value: number) {
    const rating = this.getRating(
      name as keyof typeof WEB_VITALS_THRESHOLDS,
      value,
    );
    const metric: PerformanceMetric = {
      name,
      value,
      rating,
      timestamp: Date.now(),
    };

    this.metrics.set(name, metric);
    this.reportMetric(metric);
  }

  private getRating(
    name: keyof typeof WEB_VITALS_THRESHOLDS,
    value: number,
  ): "good" | "needs-improvement" | "poor" {
    const thresholds = WEB_VITALS_THRESHOLDS[name];
    if (!thresholds) return "good";

    if (value <= thresholds.good) return "good";
    if (value <= thresholds.poor) return "needs-improvement";
    return "poor";
  }

  private reportMetric(metric: PerformanceMetric) {
    // Send to analytics service
    if (typeof window !== "undefined" && window.plausible) {
      window.plausible("Web Vitals", {
        props: {
          metric: metric.name,
          value: Math.round(metric.value),
          rating: metric.rating,
        },
      });
    }

    // Log in development
    if (process.env.NODE_ENV === "development") {
      console.log(
        `[Performance] ${metric.name}: ${metric.value.toFixed(2)}ms (${metric.rating})`,
      );
    }
  }

  public getMetrics(): PerformanceMetric[] {
    return Array.from(this.metrics.values());
  }

  public getMetric(name: string): PerformanceMetric | undefined {
    return this.metrics.get(name);
  }

  public disconnect() {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers = [];
  }
}

// Global performance monitor instance
let performanceMonitor: PerformanceMonitor | null = null;

export function initializePerformanceMonitoring() {
  if (typeof window !== "undefined" && !performanceMonitor) {
    performanceMonitor = new PerformanceMonitor();
  }
  return performanceMonitor;
}

// Web Vitals reporting function (compatible with web-vitals library)
export function reportWebVitals(metric: WebVitalsMetric) {
  // Send to analytics
  if (typeof window !== "undefined" && window.plausible) {
    window.plausible("Web Vitals", {
      props: {
        metric: metric.name,
        value: Math.round(metric.value),
        rating: metric.rating,
        id: metric.id,
      },
    });
  }

  // Log in development
  if (process.env.NODE_ENV === "development") {
    console.log(
      `[Web Vitals] ${metric.name}: ${metric.value.toFixed(2)} (${metric.rating})`,
    );
  }
}

// Performance timing utilities
export const performanceUtils = {
  // Measure function execution time
  measureFunction: <T extends (...args: any[]) => any>(
    fn: T,
    name?: string,
  ): T => {
    return ((...args: Parameters<T>) => {
      const start = performance.now();
      const result = fn(...args);
      const end = performance.now();

      if (name && process.env.NODE_ENV === "development") {
        console.log(`[Performance] ${name}: ${(end - start).toFixed(2)}ms`);
      }

      return result;
    }) as T;
  },

  // Measure async function execution time
  measureAsyncFunction: <T extends (...args: any[]) => Promise<any>>(
    fn: T,
    name?: string,
  ): T => {
    return (async (...args: Parameters<T>) => {
      const start = performance.now();
      const result = await fn(...args);
      const end = performance.now();

      if (name && process.env.NODE_ENV === "development") {
        console.log(`[Performance] ${name}: ${(end - start).toFixed(2)}ms`);
      }

      return result;
    }) as T;
  },

  // Mark performance milestones
  mark: (name: string) => {
    if (typeof performance !== "undefined" && performance.mark) {
      performance.mark(name);
    }
  },

  // Measure between two marks
  measure: (name: string, startMark: string, endMark?: string) => {
    if (typeof performance !== "undefined" && performance.measure) {
      try {
        performance.measure(name, startMark, endMark);
        const measure = performance.getEntriesByName(name, "measure")[0];
        return measure?.duration || 0;
      } catch (error) {
        console.warn(`Failed to measure ${name}:`, error);
        return 0;
      }
    }
    return 0;
  },

  // Get navigation timing
  getNavigationTiming: () => {
    if (typeof performance !== "undefined" && "navigation" in performance) {
      return performance.getEntriesByType(
        "navigation",
      )[0] as PerformanceNavigationTiming;
    }
    return null;
  },

  // Get resource timing
  getResourceTiming: (url?: string) => {
    if (typeof performance !== "undefined") {
      const entries = performance.getEntriesByType(
        "resource",
      ) as PerformanceResourceTiming[];
      return url
        ? entries.filter((entry) => entry.name.includes(url))
        : entries;
    }
    return [];
  },
};

// React hook for performance monitoring
export function usePerformanceMonitoring() {
  React.useEffect(() => {
    const monitor = initializePerformanceMonitoring();

    return () => {
      monitor?.disconnect();
    };
  }, []);

  return {
    getMetrics: () => performanceMonitor?.getMetrics() || [],
    getMetric: (name: string) => performanceMonitor?.getMetric(name),
  };
}

// Component performance wrapper
export function withPerformanceMonitoring<P extends object>(
  Component: React.ComponentType<P>,
  componentName?: string,
) {
  const WrappedComponent = React.memo((props: P) => {
    const name = componentName || Component.displayName || Component.name;

    React.useEffect(() => {
      performanceUtils.mark(`${name}-mount-start`);

      return () => {
        performanceUtils.mark(`${name}-unmount`);
        performanceUtils.measure(
          `${name}-lifecycle`,
          `${name}-mount-start`,
          `${name}-unmount`,
        );
      };
    }, [name]);

    return React.createElement(Component, props);
  });

  WrappedComponent.displayName = `withPerformanceMonitoring(${componentName || Component.displayName || Component.name})`;

  return WrappedComponent;
}

// Declare global plausible function
declare global {
  interface Window {
    plausible?: (
      event: string,
      options?: { props?: Record<string, any> },
    ) => void;
  }
}
