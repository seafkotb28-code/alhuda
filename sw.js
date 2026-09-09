const CACHE_NAME = 'alhuda-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html'
];

// تثبيت ملفات الموقع الأساسية في الذاكرة
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// تفعيل السيرفيس وركر
self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// اعتراض الطلبات وتخزين الصوت والبيانات تلقائياً عند التشغيل
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((response) => {
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      });
    }).catch(() => {
      return new Response('أنت غير متصل بالإنترنت');
    })
  );
});