// Polyfills for browser APIs that might be accessed during SSR

// IndexedDB polyfill for SSR
if (typeof global !== "undefined" && !global.indexedDB) {
  global.indexedDB = {
    open: () => ({
      addEventListener: () => {},
      removeEventListener: () => {},
      result: null,
      error: null,
      onsuccess: null,
      onerror: null,
      onupgradeneeded: null,
    }),
    deleteDatabase: () => ({
      addEventListener: () => {},
      removeEventListener: () => {},
      result: null,
      error: null,
      onsuccess: null,
      onerror: null,
    }),
    cmp: () => 0,
  } as any;
}

// LocalStorage polyfill for SSR
if (typeof global !== "undefined" && !global.localStorage) {
  global.localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
    length: 0,
    key: () => null,
  } as any;
}

// SessionStorage polyfill for SSR
if (typeof global !== "undefined" && !global.sessionStorage) {
  global.sessionStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
    length: 0,
    key: () => null,
  } as any;
}

// Window polyfill for SSR
if (typeof global !== "undefined" && !global.window) {
  global.window = {
    ...global,
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => true,
    location: {
      href: "",
      origin: "",
      protocol: "https:",
      host: "",
      hostname: "",
      port: "",
      pathname: "/",
      search: "",
      hash: "",
    },
    navigator: {
      userAgent: "",
      language: "en-US",
      languages: ["en-US"],
      platform: "",
    },
    screen: {
      width: 1920,
      height: 1080,
    },
    innerWidth: 1920,
    innerHeight: 1080,
    outerWidth: 1920,
    outerHeight: 1080,
    devicePixelRatio: 1,
    scrollX: 0,
    scrollY: 0,
    pageXOffset: 0,
    pageYOffset: 0,
    getComputedStyle: () => ({}),
    matchMedia: () => ({
      matches: false,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
    }),
    requestAnimationFrame: (callback: any) => setTimeout(callback, 16),
    cancelAnimationFrame: (id: any) => clearTimeout(id),
    setTimeout: global.setTimeout,
    clearTimeout: global.clearTimeout,
    setInterval: global.setInterval,
    clearInterval: global.clearInterval,
  } as any;
}

// Document polyfill for SSR
if (typeof global !== "undefined" && !global.document) {
  global.document = {
    createElement: () => ({
      setAttribute: () => {},
      getAttribute: () => null,
      appendChild: () => {},
      removeChild: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      style: {},
      classList: {
        add: () => {},
        remove: () => {},
        contains: () => false,
        toggle: () => false,
      },
    }),
    createTextNode: () => ({
      textContent: "",
      nodeValue: "",
    }),
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
    addEventListener: () => {},
    removeEventListener: () => {},
    readyState: "complete",
    head: {
      appendChild: () => {},
      removeChild: () => {},
    },
    body: {
      appendChild: () => {},
      removeChild: () => {},
      classList: {
        add: () => {},
        remove: () => {},
        contains: () => false,
        toggle: () => false,
      },
      style: {
        overflow: "",
      },
    },
  } as any;
}

export {};
