const CACHE_NAME = 'GHWANG-CACHE-2e7c64d6-7d77-4ab5-87ea-fd9b560928p6';

const IMPERATIVE_CACHES = [
    '/images/easter-egg/1up.png',
    '/images/easter-egg/coin.svg',
    '/images/easter-egg/question-block.svg',
    'https://fonts.googleapis.com/css2?family=Inter:wght@100;400&display=swap',
    '/fonts/gordon-handwriting-webfont.woff',
    '/fonts/hey_august-webfont.woff',
    '/fonts/gordon-handwriting-webfont.woff2',
    '/fonts/hey_august-webfont.woff2',
    '/images/title-bg.png',
    '/images/hscbow/homesweethome.jpg',
    '/images/hscbow/leaving.jpg',
    '/images/hscbow/bonvoyage.jpg',
    '/images/hscbow/rabureta.jpg',
    '/images/hscbow/ruiji.jpg',
    '/images/hscbow/homecoming.jpg',
    '/images/minecraft-recreation/screensaver.mp4',
    '/images/covers/minesweeper.mp4',
    '/images/minecraft-recreation/1.png',
    '/images/minecraft-recreation/2.png',
    '/images/minecraft-recreation/3.png',
    '/images/minecraft-recreation/4.png',
    '/images/minecraft-recreation/5.png',
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
