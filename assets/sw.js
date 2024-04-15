// Cache requests so the app can work offline
// https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Offline_Service_workers
const cacheName = "myapp";

self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      try {
        const response = await fetch(e.request);
        const cache = await caches.open(cacheName);
        console.log(`[Service Worker] Caching resource: ${e.request.url}`);
        cache.put(e.request, response.clone());
        return response;
      } catch {
        // if we have no network access, try to use the cache
        const response = await caches.match(e.request);
        console.log(`[Service Worker] Using cached resource: ${e.request.url}`);
        if (response) {
          return response;
        }
      }
    })(),
  );
});
