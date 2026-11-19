import type { PageLoad } from './$types';

import { IDBStorage } from '#lib/storage/index.ts';

// Disable prerendering for character sheet
export const prerender = false;
export const ssr = false;

export const load: PageLoad = async () => {
	const db = IDBStorage.init();

	const settingsValues = await db.getSettings();

	return {
		db,
		settingsValues,
	};
};
