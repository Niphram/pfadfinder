import type { LayoutLoad } from './$types';

import { browser } from '$app/environment';

import { IDBStorage } from '$lib/storage';

// Try to prerender everything by default
export const prerender = true;
export const ssr = true;

export const load: LayoutLoad = async () => {
	if (browser) {
		const db = await IDBStorage.init();
		return { db };
	} else {
		// TODO: better way to not load IDB while prerendering
		return { db: {} as IDBStorage };
	}
};
