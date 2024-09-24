importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/7.1.0/workbox-sw.js'
);

const {registerRoute, NavigationRoute } = workbox.routing;
const {CacheFirst,NetworkOnly,NetworkFirst} = workbox.strategies;
const {CacheableResponse} = workbox.cacheableResponse;
const {ExpirationPlugin}=workbox.ExpirationPlugin
workbox.setConfig({
    debug:true
});
const preLoad = function () {
    return caches.open("offline").then(function (cache) {
        // caching index and important routes
        return cache.addAll(filesToCache);
    });
};

self.addEventListener("install", function (event) {
    event.waitUntil(preLoad());
});

const filesToCache = [
    '/',
    '/offline.html'
];

const checkResponse = function (request) {
    return new Promise(function (fulfill, reject) {
        fetch(request).then(function (response) {
            if (response.status !== 404) {
                fulfill(response);
            } else {
                reject();
            }
        }, reject);
    });
};

const addToCache = function (request) {
    return caches.open("offline").then(function (cache) {
        return fetch(request).then(function (response) {
            return cache.put(request, response);
        });
    });
};

/*const returnFromCache = function (request) {
    return caches.open("offline").then(function (cache) {
        return cache.match(request).then(function (matching) {
            if (!matching || matching.status === 404) {
                return cache.match("offline.html");
            } else {
                return matching;
            }
        });
    });
};*/

/*self.addEventListener("fetch", function (event) {
    event.respondWith(checkResponse(event.request).catch(function () {
        return returnFromCache(event.request);
    }));
    if(!event.request.url.startsWith('http')){
        event.waitUntil(addToCache(event.request));
    }
});*/

const networkWithFallbackStrategy = new NetworkOnly({
  networkTimeoutSeconds: 5,
  plugins: [
    {
      handlerDidError: async () => {
        return await caches.match("offline.html", {
          cacheName: "offline",
        });
      },
    },
  ],
});

// Register the route to handle all navigations.
registerRoute(new NavigationRoute(networkWithFallbackStrategy));
registerRoute(
  ({request}) => request.destination === 'image',
  new CacheFirst({
    plugins: [new CacheableResponsePlugin({statuses: [0, 200]}),
              new ExpirationPlugin({
              maxEntries: 60,
              maxAgeSeconds: 30 * 24 * 60 * 60 }),
             ],
  })
);
registerRoute(
  ({request}) => request.destination === 'style',
  new CacheFirst({
    cacheName:"styles",
    plugins: [new CacheableResponsePlugin({statuses: [0, 200]}),
              new ExpirationPlugin({
              maxEntries: 60,
              maxAgeSeconds: 30 * 24 * 60 * 60 }),
             ],
  })
);
registerRoute(
  ({request}) => request.destination === 'script',
  new CacheFirst({
      cacheName:"scripts",
      plugins: [new CacheableResponsePlugin({statuses: [0, 200]}),
              new ExpirationPlugin({
              maxEntries: 60,
              maxAgeSeconds: 30 * 24 * 60 * 60 ,
              
              }),
             ],
  })
);


registerRoute(
  new Route(({url}) => {
  return url.includes("cdn") == true;
}, new NetworkFirst({
  cacheName:"cdns",
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200]
    }),
      new ExpirationPlugin({
       maxEntries: 60,
       maxAgeSeconds: 30 * 24 * 60 * 60 ,
       purgeOnQuotaError: true
        })
  ]
}))
);
