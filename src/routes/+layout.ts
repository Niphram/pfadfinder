import type { LayoutLoad } from './$types';

import { browser } from '$app/env';

import { mockStorage } from '#lib/mocks/storage.js';
import { IDBStorage } from '#lib/storage/index.js';

// Try to prerender everything by default
export const prerender = true;
export const ssr = true;

export const load: LayoutLoad = async () => {
	if (browser) {
		const db = await IDBStorage.init();
		return { db };
	} else {
		return { db: mockStorage };
	}
};
