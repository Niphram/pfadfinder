import { error } from '@sveltejs/kit';

import { Character } from '$lib/data';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ params, parent }) => {
	const { db } = await parent();

	console.log(db, params);

	// TODO!
	const character = new Character(); //await db.getCharacterById(params.id);

	if (!character) error(404, { message: 'Character not found!' });

	return {
		character,
	};
};
