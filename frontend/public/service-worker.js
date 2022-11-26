const CACHE_NAME = 'IMAGE_CACHE';

const IMPERATIVE_CACHES = [
  '/index.html',
  '/images/hscbow/homesweethome.jpg',
  '/images/hscbow/leaving.jpg',
  '/images/hscbow/bonvoyage.jpg',
  '/images/hscbow/rabureta.jpg',
  '/images/hscbow/ruiji.jpg',
  '/images/hscbow/homecoming.jpg',
  '/images/hscbow-hq/homesweethome.jpg',
  '/images/hscbow-hq/leaving.jpg',
  '/images/hscbow-hq/bonvoyage.jpg',
  '/images/hscbow-hq/rabureta.jpg',
  '/images/hscbow-hq/ruiji.jpg',
  '/images/hscbow-hq/homecoming.jpg',
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
