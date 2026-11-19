import { error } from '@sveltejs/kit';

import type { PageLoad } from './$types';

import { IDBStorage } from '#lib/storage/index.ts';

// Disable prerendering for character sheet
export const prerender = false;
export const ssr = false;

export const load: PageLoad = async ({ params }) => {
	const db = IDBStorage.init();

	const character = await db.getCharacterById(params.id);

	if (!character) error(404, 'Character not found!');

	return {
		db,
		character,
	};
};
