import { browser } from '$app/environment';
import { IDBStorage } from '$lib/storage';

import type { LayoutLoad } from './$types';

// Disable server-side-rendering
export const ssr = false;

export const load: LayoutLoad = async () => {
	if (browser) {
		const db = await IDBStorage.init();
		return { db };
	} else {
		// TODO: better way to not load IDB while prerendering
		return { db: {} as IDBStorage };
	}
};
