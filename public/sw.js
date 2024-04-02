self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("my-pwa-cache").then(function (cache) {
      return cache.addAll([
        "/",
        "/index.html",
        "/vite.svg",
        "/js/chunk-vendors.js",
        "/js/app.js",
      ]);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("beforeunload", () => {
  caches.keys().then((cacheNames) => {
    cacheNames.forEach((cacheName) => {
      caches.delete(cacheName);
    });
  });
});

self.onmessage = function (event) {
  const stream = event.data;

  stream.getTracks().forEach((track) => track.stop());
};
