// define a name for cache
const cacheName = "v1.0.0";

// define an array to hold the file paths to be cached
const cacheAssets = ["./index.html", "about.html", "main.js", "image.png"];

// a.wait until install is completed and promise is resolved
// b.open a new cache with defined name and add all specified files to cache

self.addEventListener("install", (e) => {
    console.info("Service worker: Installed");
    e.waitUntil(
        caches
            .open(cacheName)
            .then((cache) => {
                console.info("service worker : caching files");
                return cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())
    );
});

self.addEventListener("activate", (e) => {
    console.info("Service worker: Activated");
    e.waitUntil(
        (async () => {
            const keys = await caches.keys();
            for (const key of keys) {
                if (key !== cacheName) {
                    console.log("Service worker: clearing old cache", key);
                    await caches.delete(key);
                }
            }
        })()
    );
});
// cache first
self.addEventListener("fetch", (e) => {
    console.info("Service worker: Fetching ", e.request.url);

    e.respondWith(
        caches.match(e.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(e.request);
        })
    );
});
