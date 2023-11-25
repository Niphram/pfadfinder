export const prerender = true;

import { SPELLS } from '$lib/server/data-source/spells';
import { json, type RequestHandler } from '@sveltejs/kit';
import type { EntryGenerator } from './$types';

export const entries: EntryGenerator = async () => {
	return Array.from(SPELLS.keys()).map((name) => ({ name: encodeURIComponent(name) }));
};

export const GET: RequestHandler = async ({ params }) => {
	const { name } = params;

	if (name !== undefined) {
		const spell = SPELLS.get(decodeURIComponent(name));

		if (spell) {
			return json(spell);
		}
	}

	throw new Error('Spell not found: ' + params.name);
};
