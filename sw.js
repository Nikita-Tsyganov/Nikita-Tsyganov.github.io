
const staticCacheName = 'nikita-t-static-v2.0.2';


self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(staticCacheName).then(function(cache) {
            return cache.addAll(
                [
                    './index.html',
                    './manifest.json',
                    './favicon.ico',
                    './sw.js',
                    './js/main.js',
                    './css/main.css',
                    './css/font_awesome.css',
                    './css/font_open_sans.css',
                    './img/arcade-game.JPG',
                    './img/restaurant-reviews.JPG'
                ]
            );
        })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    return cacheName.startsWith('nikita-') && cacheName !== staticCacheName;
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.open(staticCacheName).then(function(cache) {
            return cache.match(event.request).then(function (response) {
                return response || fetch(event.request).then(function(response) {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});
