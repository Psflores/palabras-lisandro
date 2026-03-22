// Service Worker — Palabras de Lisandro — Cache offline
const CACHE_NAME = 'palabras-v25';
const AUDIO_CACHE = 'palabras-audio-v2';
const IMG_CACHE = 'palabras-img-v1';
const ASSETS = [
  './',
  './index.html',
  './numeros.html',
  './datos.js',
  './datos_lectura.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './audio/_mapping.json',
  './img/_img_mapping.json',
  'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME && k !== AUDIO_CACHE && k !== IMG_CACHE)
            .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Archivos de audio: cache-first (offline después del primer uso)
  if (url.pathname.includes('/audio/')) {
    event.respondWith(
      caches.open(AUDIO_CACHE).then(cache =>
        cache.match(event.request).then(cached => {
          if (cached) return cached;
          return fetch(event.request).then(response => {
            if (response.ok) cache.put(event.request, response.clone());
            return response;
          }).catch(() => cached || new Response('', { status: 503 }));
        })
      )
    );
    return;
  }

  // Imágenes de palabras: cache-first (offline después del primer uso)
  if (url.pathname.includes('/img/')) {
    event.respondWith(
      caches.open(IMG_CACHE).then(cache =>
        cache.match(event.request).then(cached => {
          if (cached) return cached;
          return fetch(event.request).then(response => {
            if (response.ok) cache.put(event.request, response.clone());
            return response;
          }).catch(() => cached || new Response('', { status: 503 }));
        })
      )
    );
    return;
  }

  // Todo lo demás: network-first con fallback a cache
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
