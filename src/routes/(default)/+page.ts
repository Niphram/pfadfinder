import type { PageLoad } from './$types';

import { browser } from '$app/environment';

export const load: PageLoad = async ({ parent, depends }) => {
	const { db } = await parent();

	depends('characters:list');
	const characters = browser ? await db.getCharactersMetadata() : [];

	return {
		db,
		characters,
	};
};
