declare global {
  interface Window {
    plausible?: (
      event: string,
      options?: { props?: Record<string, any> },
    ) => void;
  }
}

/**
 * Fires a Plausible custom event with optional properties.
 * Usage: trackEvent('Event Name', { key: value })
 */
export function trackEvent(event: string, props?: Record<string, any>) {
  // if (typeof window !== "undefined" && typeof window.plausible === "function") {
  //   window.plausible(event, props ? { props } : undefined);
  // }
}
