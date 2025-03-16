import { IDBStorage } from '$lib/storage';

import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
	const db = await IDBStorage.init();

	return { db };
};
