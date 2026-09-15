// Intake Ledger service worker: cache the app shell so it opens offline; never cache API calls.
const CACHE = "intake-shell-v2";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const u = new URL(e.request.url);
  if (u.origin !== location.origin || e.request.method !== "GET") return; // Dropbox / Anthropic / fonts go straight to the network
  e.respondWith(fetch(e.request).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r; }).catch(() => caches.match(e.request).then(m => m || caches.match("./index.html"))));
});

// Daily reminder push (sent by the repository's reminder workflow)
self.addEventListener("push", e => {
  let data = {}; try { data = e.data ? e.data.json() : {}; } catch { data = { body: e.data && e.data.text() }; }
  const title = data.title || "Intake Ledger";
  const opts = { body: data.body || "What did you eat today? Tap to log.", icon: "./icon-192.png", badge: "./icon-192.png", tag: "intake-daily", renotify: true, data: { url: "./?log=1" } };
  e.waitUntil(self.registration.showNotification(title, opts));
});
self.addEventListener("notificationclick", e => {
  e.notification.close();
  const target = new URL(e.notification.data && e.notification.data.url || "./", self.location.href).href;
  e.waitUntil(clients.matchAll({ type: "window", includeUncontrolled: true }).then(list => {
    for (const c of list) { if (c.url.startsWith(self.registration.scope)) { c.focus(); c.postMessage({ type: "open-log" }); return; } }
    return clients.openWindow(target);
  }));
});
