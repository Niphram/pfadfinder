import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, depends }) => {
	const { db } = await parent();

	depends('characters:list');
	const characters = await db.getCharactersMetadata();

	return {
		db,
		characters,
	};
};
