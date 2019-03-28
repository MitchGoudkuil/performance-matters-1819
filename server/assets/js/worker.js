const CACHENAME = 'v1'
const cacheFiles = [
  '/',
  '../css/style.css',
  './main.js',
  '/offline'
]
self.addEventListener('install', function(e) {
  console.log("[ServiceWorker] Installed")

  e.waitUntil(
    caches.open(CACHENAME).then(function(cache) {
      console.log("caching cacheFiles");
      return cache.addAll(cacheFiles)
    })
  )
})


self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response
        }
        return fetch(event.request)
      })
  )
})
