import { nanoid } from 'nanoid';

import { boolean, ClassSerializer, enumeration, string } from '$lib/serde';

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

	open = boolean(false);

	name = string('Unnamed Feat', { minLength: 1, maxLength: 100 });

	prerequisites = string('', { maxLength: 1000 });

	type = enumeration(FEAT_TYPES, 'general');

	benefits = string('', { maxLength: 1000 });

	normal = string('', { maxLength: 1000 });

	special = string('', { maxLength: 1000 });
}
