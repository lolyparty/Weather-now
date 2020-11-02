const cacheName = 'watheranowCache-v1';
const cachedAssets = [
    '/',
    'index.js',
    '/index.html',
    'style.css',
    'https://fonts.googleapis.com/css2?family=Roboto&display=swap',
    'https://fonts.googleapis.com/css2?family=Lato:wght@400&display=swap',
    'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu72xKKTU1Kvnz.woff2',
    'https://fonts.gstatic.com/s/lato/v17/S6uyw4BMUTPHjxAwXiWtFCfQ7A.woff2',
    'img/day.webp',
    'img/barometer.svg',
    'img/humidity.svg',
    'img/icons8-search.svg',
    'img/pin (1).svg',
    'img/uv-protection.svg',
    'img/wind.svg'
]

//install event
self.addEventListener('install',(evt)=>{
    // console.log('service worker installed')
    evt.waitUntil(caches.open(cacheName)
    .then(cache=>{
        cache.addAll(cachedAssets)
    }))
})

// activate event
self.addEventListener('activate',evt=>{
    // console.log('service worker activated')
    evt.waitUntil(
        caches.keys().then(keys=>{
            return Promise.all(keys
                .filter(key => key !== cacheName)
                .map(key=>caches.delete(key)))
        })
    )
})

self.addEventListener('fetch',evt=>{
    // console.log('fetch request successful')
    evt.respondWith(
        caches.match(evt.request)
        .then(cacheRes=>{
            return cacheRes || fetch(evt.request)
        })
    )
})