/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

const sw = self as unknown as ServiceWorkerGlobalScope;

import { build, files, version } from '$service-worker';

// Create a unique cache name for this deployment
const CACHE = `cache-${version}`;

const ASSETS = build.concat(files);

console.log(ASSETS);

sw.addEventListener('install', (event) => {
	console.log('INSTALL');
	event.waitUntil(sw.skipWaiting());
});

sw.addEventListener('activate', (event) => {
	console.log('ACTIVATE');
	event.waitUntil(sw.clients.claim());
});

sw.addEventListener('fetch', (event) => {
	// console.log('FETCH');
});
