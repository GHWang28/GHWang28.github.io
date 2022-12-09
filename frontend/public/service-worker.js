const CACHE_NAME = 'GHWANG_CACHE_V2';

const IMPERATIVE_CACHES = [
    '/images/easter-egg/1up.png',
    '/images/easter-egg/coin.svg',
    '/images/easter-egg/question-block.svg',
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

