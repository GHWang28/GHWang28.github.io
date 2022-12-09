const CACHE_NAME = 'GHWANG_CACHE_V1';

const IMPERATIVE_CACHES = [
    '/images/easter-egg/1up.png',
    '/images/easter-egg/coin.svg',
    '/images/easter-egg/question-block.svg',
    'https://fonts.googleapis.com/css2?family=Inter:wght@100;400&display=swap',
    'fonts/gordon-handwriting-webfont.woff',
    'fonts/hey_august-webfont.woff',
    'fonts/gordon-handwriting-webfont.woff2',
    'fonts/hey_august-webfont.woff2',
    'images/title-bg.png',
];

/**
 * Caches all the required caches
 */
self.addEventListener('install', (event) => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME)
    .then((openedCache) => {
      openedCache.addAll(IMPERATIVE_CACHES);
    })
  );
});


/**
 * Delete any old caches that are detected by having different cache name
 */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
    .then((keys) => {
      // Looks for outdated cach to delete
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME)
        .map((key) => caches.delete(key))
      );
    })
  );
});

/**
 * Fetch from cache if it exists in cache
 */
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cacheResolve) => {
      return cacheResolve || fetch(event.request);
    })
  )
})
