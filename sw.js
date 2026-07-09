const CACHE_NAME = 'wafuu-station-cache-v1';
const ASSETS = [
  './',
  './index.html',
  './css/theme.css',
  './js/vocab-data.js',
  './js/srs.js',
  './js/parser.js',
  './js/grammar-course-data.js',
  './js/fun-dojo-data.js',
  './js/fun-dojo.js',
  './js/rpg-data.js',
  './js/rpg-game.js',
  './js/romaji-converter.js',
  './js/japanese-tokenizer.js',
  './js/wafuu-audio.js',
  './js/sakura-effect.js'
];

// 安装阶段缓存静态资源
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // 容错捕获，防止单个文件缺失导致整个缓存失败
      return Promise.allSettled(
        ASSETS.map(asset => cache.add(asset))
      );
    }).then(() => self.skipWaiting())
  );
});

// 激活阶段清理过期的旧缓存
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 拦截请求并优先使用缓存 (带 Stale-While-Revalidate 与 file 协议过滤)
self.addEventListener('fetch', e => {
  // 只处理 http 和 https 的网络资源缓存拦截，避开 file:// 引起的跨源异常
  if (!e.request.url.startsWith('http')) return;

  e.respondWith(
    caches.match(e.request).then(cachedResponse => {
      if (cachedResponse) {
        // 后台异步抓取最新版本并更新缓存
        fetch(e.request).then(networkResponse => {
          if (networkResponse.status === 200) {
            caches.open(CACHE_NAME).then(cache => cache.put(e.request, networkResponse));
          }
        }).catch(() => {});
        return cachedResponse;
      }
      return fetch(e.request);
    })
  );
});
