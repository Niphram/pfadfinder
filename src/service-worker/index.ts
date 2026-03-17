/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />
/// <reference types="@sveltejs/kit" />

import { build, files, prerendered, version } from '$service-worker';

const sw = self as unknown as ServiceWorkerGlobalScope;

// Every new version gets a new cache
const CACHE = `cache-${version}`;
const PROTECTED_CACHES: string[] = [];

// All assets, with duplicates removed
const ASSETS = [...new Set(build.concat(prerendered, files))];

function log(tag: string, message: string) {
	console.log(`[ServiceWorker] [${tag}] ${message}`);
}

sw.addEventListener('install', (event) => {
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

sw.addEventListener('activate', (event) => {
	// Remove previous cached data from disk (except protected caches)
	async function deleteOldCaches() {
		for (const key of await caches.keys()) {
			if (key !== CACHE && !PROTECTED_CACHES.includes(key)) {
				log('activate', `Removing old cache "${key}".`);

				await caches.delete(key);
			}
		}

		log('install', `Deleted old caches.`);
	}

	event.waitUntil(deleteOldCaches());
});

sw.addEventListener('fetch', (event) => {
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
				cache.put(event.request, response.clone());
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
