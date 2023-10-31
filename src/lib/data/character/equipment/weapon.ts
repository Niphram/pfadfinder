import { autoserialize } from 'cerialize';
import type { AbilityKey } from '../abilities';

export const ATTACK_TYPES = [
	'meelee',
	'ranged',
	'cmb',
	'babFull',
	'babMax',
	'flurryOfBlows'
] as const;
export type AttackType = (typeof ATTACK_TYPES)[number];

export const ATTACK_VERSUS = [
	'ac',
	'touch',
	'flatFooted',
	'ffTouch',
	'cmd',
	'cmbOpposed',
	'fortitude',
	'reflex',
	'will',
	'other'
] as const;
export type AttackVersusType = (typeof ATTACK_VERSUS)[number];

class Attack {
	type?: AttackType = 'meelee';

	ability?: AbilityKey;

	mod = 0;

	versus: AttackVersusType = 'ac';

	critRange = 20;

	range = '';
}

export class Weapon {
	@autoserialize
	name = 'Unnamed Weapon';

	@autoserialize
	category = '';

	@autoserialize
	type = '';

	attack = {};

	description = '';

	notes = '';
}
