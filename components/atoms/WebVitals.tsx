"use client";

import { useEffect } from "react";
import { reportWebVitals } from "@/utils/performance";

// Web Vitals component for Next.js integration
export function WebVitals() {
  useEffect(() => {
    // Dynamically import web-vitals to avoid SSR issues
    import("web-vitals")
      .then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
        onCLS(reportWebVitals);
        onFCP(reportWebVitals);
        onLCP(reportWebVitals);
        onTTFB(reportWebVitals);
        onINP(reportWebVitals);
      })
      .catch((error) => {
        console.warn("Failed to load web-vitals:", error);
      });
  }, []);

  return null; // This component doesn't render anything
}

// Performance monitoring component for development
export function PerformanceMonitor() {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      // Monitor long tasks
      if ("PerformanceObserver" in window) {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (entry.duration > 50) {
              console.warn(
                `[Performance] Long task detected: ${entry.duration.toFixed(2)}ms`,
              );
            }
          });
        });

        try {
          observer.observe({ entryTypes: ["longtask"] });
        } catch {
          console.warn("Long task monitoring not supported");
        }

        return () => observer.disconnect();
      }
    }
  }, []);

  return null;
}

// Component to track page load performance
export function PageLoadTracker({ pageName }: { pageName: string }) {
  useEffect(() => {
    const startTime = performance.now();

    // Track page load time
    const handleLoad = () => {
      const loadTime = performance.now() - startTime;

      if (window.plausible) {
        window.plausible("Page Load Time", {
          props: {
            page: pageName,
            loadTime: Math.round(loadTime),
          },
        });
      }

      if (process.env.NODE_ENV === "development") {
        console.log(
          `[Performance] ${pageName} loaded in ${loadTime.toFixed(2)}ms`,
        );
      }
    };

    // Track when page is fully loaded
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, [pageName]);

  return null;
}
