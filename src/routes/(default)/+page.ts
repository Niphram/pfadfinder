import { liveQuery } from 'dexie';

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	const { db } = await parent();
	const characters = liveQuery(() => db.getCharactersMetadata());

	return {
		db,
		characters
	};
};
