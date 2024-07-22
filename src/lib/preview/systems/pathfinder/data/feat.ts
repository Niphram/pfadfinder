import { autoserialize } from 'cerialize';
import { nanoid } from 'nanoid';

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
	'misc'
] as const;
export type FeatType = (typeof FEAT_TYPES)[number];

export class Feat {
	@autoserialize
	id = nanoid();

	@autoserialize
	name = 'New Feat';

	@autoserialize
	prerequisites = '';

	@autoserialize
	type: FeatType = 'general';

	@autoserialize
	benefits = '';

	@autoserialize
	normal = '';

	@autoserialize
	special = '';
}
