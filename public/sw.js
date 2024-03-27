self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('my-pwa-cache').then(function(cache) {
        return cache.addAll([
          '/',
          '/index.html',
          '/favicon.ico', // Adjust this according to your favicon path
          '/js/chunk-vendors.js', // Adjust this according to your build output
          '/js/app.js' // Adjust this according to your build output
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  });