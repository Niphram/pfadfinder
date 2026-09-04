import { version } from '$app/env';
import { assets, immutable, prerendered } from '$app/manifest';
import { resolve } from '$app/paths';
import { self } from '$app/service-worker';

// Every new version gets a new cache
const CACHE = `cache-${version}`;
const PROTECTED_CACHES: Set<string> = new Set();

// All assets, with duplicates removed
const ASSETS = [
	...new Set(immutable.concat(prerendered, assets).map((e) => resolve(e.path))),
];

function log(tag: string, message: string) {
	console.log(`[ServiceWorker] [${tag}] ${message}`);
}

self.addEventListener('install', (event) => {
	// Create a new cache and add all files to it
	async function addFilesToCache() {
		log(
			'install',
			`Opening cache "${CACHE}" and adding ${ASSETS.length} assets.`,
		);

		const cache = await caches.open(CACHE);
		await cache.addAll(ASSETS);

		log('install', `All assets added.`);
	}

	event.waitUntil(addFilesToCache());
});

self.addEventListener('activate', (event) => {
	// Remove previous cached data from disk (except protected caches)
	async function deleteOldCaches() {
		const cacheKeys = await caches.keys();

		await Promise.all(
			cacheKeys.map(async (key) => {
				if (key !== CACHE && !PROTECTED_CACHES.has(key)) {
					log('activate', `Removing old cache "${key}".`);
					await caches.delete(key);
				}
			}),
		);

		log('install', `Deleted old caches.`);
	}

	event.waitUntil(deleteOldCaches());
});

self.addEventListener('fetch', (event) => {
	// ignore POST requests etc
	if (event.request.method !== 'GET') return;

	async function respond() {
		const url = new URL(event.request.url);
		const cache = await caches.open(CACHE);

		// `build`/`files` can always be served from the cache
		if (ASSETS.includes(url.pathname)) {
			const response = await cache.match(url.pathname);

			if (response) {
				return response;
			}
		}

		// try to return the index for navigation-requests (single page app)
		if (event.request.mode === 'navigate') {
			const response = await cache.match('');

			if (response) {
				return response;
			}
		}

		// for everything else, try the network first, but
		// fall back to the cache if we're offline
		try {
			const response = await fetch(event.request);

			// if we're offline, fetch can return a value that is not a Response
			// instead of throwing - and we can't pass this non-Response to respondWith
			if (!(response instanceof Response)) {
				throw new Error('invalid response from fetch');
			}

			if (response.status === 200) {
				await cache.put(event.request, response.clone());
			}

			return response;
		} catch (err) {
			const response = await cache.match(event.request);

			if (response) {
				return response;
			}

			// if there's no cache, then just error out
			// as there is nothing we can do to respond to this request
			throw err;
		}
	}

	event.respondWith(respond());
});
