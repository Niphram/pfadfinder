import { error } from '@sveltejs/kit';

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, parent }) => {
	const { db } = await parent();

	const character = await db.getCharacterById(params.id);

	if (!character) error(404, { message: 'Character not found!' });

	return {
		character,
	};
};
