import { nanoid } from 'nanoid';

import { ClassSerializer, enumeration, string } from '$lib/serde';

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

export class Feat extends ClassSerializer {
	id = string(nanoid());

	name = string('New Feat');

	prerequisites = string('');

	type = enumeration<FeatType>('general');

	benefits = string('');

	normal = string('');

	special = string('');
}
