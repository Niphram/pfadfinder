import { writable } from 'svelte/store';

import type { LayoutLoad } from './$types';
import type { Character } from '$lib/data';
import { error } from '@sveltejs/kit';

export const load: LayoutLoad = async ({ params, parent }) => {
	const { db } = await parent();

	const char = await db.getCharacterById(params.id);

	if (!char) error(404, { message: 'Character not found!' });

	return {
		character: writable<Character>(char),
	};
};
