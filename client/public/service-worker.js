const CACHE_NAME = "vehicle-dashboard-cache-v1";

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const manifest = await fetch("/manifest.json").then((res) => res.json());

      const cacheFiles = [
        "/",
        "/index.html",
        ...manifest.files // Dynamically cache JS & CSS files
      ];

      console.log("Caching files:", cacheFiles);
      await cache.addAll(cacheFiles);
    })()
  );
});

// Serve files from cache when offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

// Update cache when a new version is available
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Deleting old cache:", cache);
            return caches.delete(cache);
          }
        })
      )
    )
  );
});
