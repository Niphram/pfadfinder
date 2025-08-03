import { nanoid } from 'nanoid';

import { enumeration, string } from '$lib/serde';

export const FEAT_TYPES = [
	'general',
	'combat',
	'critical',
	'grit',
	'item_creation',
	'metamagic',
	'panache',
	'performance',
	'style',
	'teamwork',
	'misc',
] as const;
export type FeatType = (typeof FEAT_TYPES)[number];

export class Feat {
	id = nanoid();

	name = string('New Feat');

	prerequisites = string('');

	type = enumeration<FeatType>('general');

	benefits = string('');

	normal = string('');

	special = string('');
}
