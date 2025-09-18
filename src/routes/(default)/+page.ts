import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	const { db } = await parent();

	const characters = await db.getCharactersMetadata();

	return {
		db,
		characters,
	};
};
