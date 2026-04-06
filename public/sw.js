const CACHE_NAME = 'stem-quiz-cache-v1';

// Install event: instantly take over
self.addEventListener('install', event => {
  self.skipWaiting();
});

// Activate event: clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event: Intercept network requests
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Automatically Cache-First strategy for IMAGES (both local and external)
  if (
    event.request.destination === 'image' || 
    url.href.includes('.png') || 
    url.href.includes('.jpg') || 
    url.href.includes('.svg') ||
    url.href.includes('.mp3') // Let's also cache audio!
  ) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        // Return cache hit immediately if we have it
        if (cachedResponse) {
          return cachedResponse;
        }

        // Fetch from network if not in cache
        return fetch(event.request).then(response => {
          // Check if response is valid (allow opaque responses from external servers like icons8)
          if (!response || (response.status !== 200 && response.type !== 'opaque')) {
            return response;
          }

          // Clone the response because it's a stream that can only be consumed once
          const responseToCache = response.clone();

          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });

          return response;
        }).catch(err => {
            // Handle offline case for images if completely failed
            console.log("Offline mode: image could not be loaded", err);
        });
      })
    );
  }
});
