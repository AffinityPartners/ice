/**
 * Service Worker for ICE Tracer - Mobile Offline Support
 * 
 * This service worker provides basic offline functionality for mobile users:
 * - Caches critical static assets (CSS, JS, images)
 * - Provides offline fallbacks for navigation
 * - Implements cache-first strategy for performance
 * - Handles offline notifications and indicators
 * 
 * The implementation focuses on essential functionality to improve
 * mobile experience on slow or unreliable connections.
 */

const CACHE_NAME = 'ice-tracer-v2';
const STATIC_CACHE = 'ice-tracer-static-v2';
const DYNAMIC_CACHE = 'ice-tracer-dynamic-v2';

// Critical assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/about',
  '/faq',
  '/images/ICE-Tracer-Logo.png',
  '/images/ICE-Profile-Image-2024-HQ.png',
  '/favicon.ico',
];

// Assets to cache on first request
const CACHE_STRATEGIES = {
  images: 'cache-first',
  api: 'network-first',
  pages: 'network-first',
  static: 'cache-first',
};

// Install event - cache critical assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS.filter(asset => !asset.includes('css') && !asset.includes('chunks')));
      })
      .then(() => {
        console.log('Service Worker: Installation complete');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Installation failed', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activation complete');
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip external requests
  if (!url.origin.includes(self.location.origin)) {
    return;
  }

  // Skip redirect pages that should go to external application
  if (url.pathname === '/member-login' || url.pathname === '/choose-plan') {
    return;
  }

  // Handle different types of requests
  if (url.pathname.startsWith('/api/')) {
    // API requests - network first with cache fallback
    event.respondWith(handleApiRequest(request));
  } else if (url.pathname.startsWith('/images/') || url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/)) {
    // Images - cache first
    event.respondWith(handleImageRequest(request));
  } else if (url.pathname.startsWith('/_next/static/')) {
    // Static assets - cache first
    event.respondWith(handleStaticRequest(request));
  } else {
    // Pages - network first with offline fallback
    event.respondWith(handlePageRequest(request));
  }
});

// Handle API requests with network-first strategy
async function handleApiRequest(request) {
  try {
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Service Worker: Network failed for API request, trying cache');
    
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline response for API
    return new Response(
      JSON.stringify({ 
        error: 'Offline', 
        message: 'This feature requires an internet connection' 
      }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Handle image requests with cache-first strategy
async function handleImageRequest(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Service Worker: Failed to load image', request.url);
    
    // Return placeholder image or empty response
    return new Response('', { 
      status: 404, 
      statusText: 'Image not available offline' 
    });
  }
}

// Handle static asset requests with cache-first strategy
async function handleStaticRequest(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Service Worker: Failed to load static asset', request.url);
    return new Response('', { status: 404 });
  }
}

// Handle page requests with network-first and offline fallback
async function handlePageRequest(request) {
  try {
    const networkResponse = await fetch(request);
    
    // Cache successful page responses
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Service Worker: Network failed for page request, trying cache');
    
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Try to return cached homepage as fallback
    const homePageCache = await caches.match('/');
    if (homePageCache) {
      return homePageCache;
    }
    
    // Return basic offline page
    return new Response(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ICE Tracer - Offline</title>
        <style>
          body {
            font-family: system-ui, sans-serif;
            margin: 0;
            padding: 2rem;
            text-align: center;
            background: #f9fafb;
            color: #374151;
          }
          .container {
            max-width: 400px;
            margin: 0 auto;
            padding: 2rem;
            background: white;
            border-radius: 1rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          }
          .icon {
            width: 64px;
            height: 64px;
            margin: 0 auto 1rem;
            background: #245789;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 24px;
          }
          h1 { color: #245789; margin-bottom: 1rem; }
          p { margin-bottom: 1.5rem; line-height: 1.6; }
          button {
            background: #245789;
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            font-size: 1rem;
            cursor: pointer;
            transition: background-color 0.2s;
          }
          button:hover { background: #1e40af; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="icon">📡</div>
          <h1>You're Offline</h1>
          <p>This page isn't available offline. Please check your internet connection and try again.</p>
          <button onclick="window.location.reload()">Try Again</button>
        </div>
      </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' }
    });
  }
}

// Handle background sync for when connection is restored
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync triggered');
  
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Perform any queued operations when connection is restored
      Promise.resolve().then(() => {
        console.log('Service Worker: Connection restored, processing queued operations');
        // Here you could implement offline form submissions, etc.
      })
    );
  }
});

// Handle push notifications (for future enhancement)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    
    event.waitUntil(
      self.registration.showNotification(data.title || 'ICE Tracer', {
        body: data.body || 'You have a new notification',
        icon: '/images/ICE-Tracer-Logo.png',
        badge: '/images/cropped-Favicon-512x512-copy.png',
        tag: 'ice-tracer-notification',
        data: data.url || '/',
      })
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow(event.notification.data || '/')
  );
});

// Send messages to clients about cache updates
function sendMessageToClients(message) {
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage(message);
    });
  });
}

// Notify clients when cache is updated
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log('Service Worker: Script loaded successfully');
