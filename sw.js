self.addEventListener("install", (event) => {
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
    const url = String(event.request.url || "");
    if (/connect\.facebook\.net|facebook\.com|facebook\.net|fbcdn\.net/i.test(url)) {
        return;
    }
    event.respondWith(fetch(event.request));
});
