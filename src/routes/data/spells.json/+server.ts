export const prerender = true;

import { SPELLS } from '$lib/pathfinder-data/spells/db';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	const spells = Array.from(SPELLS.values());

	return json(
		spells.map((spell) => ({
			name: spell.name,
			description: spell.short_description
		}))
	);
};
