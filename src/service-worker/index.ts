/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

import { self } from '$app/service-worker';
import { version } from '$app/env';
import { assets, immutable } from '$app/manifest';

const CACHE = `cache-${version}`;

// `immutable`/`assets` paths are relative to the base path, so resolve them
// against the service worker scope to get pathnames that match `url.pathname`
const SCOPE = self.registration.scope;

const ASSETS = [...immutable, ...assets].map(({ path }) => new URL(path, SCOPE).pathname);

self.addEventListener('install', (event) => {
	async function addFilesToCache() {
		const cache = await caches.open(CACHE);
		await cache.addAll(ASSETS);
	}

	event.waitUntil(addFilesToCache());
	void self.skipWaiting();
});

self.addEventListener('activate', (event) => {
	async function deleteOldCaches() {
		for (const key of await caches.keys()) {
			if (key !== CACHE) await caches.delete(key);
		}
	}

	event.waitUntil(deleteOldCaches());
});

self.addEventListener('fetch', (event) => {
	if (event.request.method !== 'GET') return;

	async function respond() {
		const url = new URL(event.request.url);
		const cache = await caches.open(CACHE);

		if (ASSETS.includes(url.pathname)) {
			const cached = await cache.match(event.request);

			if (cached) {
				return cached;
			}
		}

		try {
			const response = await fetch(event.request);

			if (response.status === 200) {
				void cache.put(event.request, response.clone());
			}

			return response;
		} catch (error) {
			const response = await cache.match(event.request);

			if (response) {
				return response;
			}

			throw error;
		}
	}

	event.respondWith(respond());
});
