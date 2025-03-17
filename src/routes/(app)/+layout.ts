import { IDBStorage } from '$lib/storage';

import type { LayoutLoad } from './$types';

export const load: LayoutLoad = () => {
	return { db: IDBStorage.init() };
};
