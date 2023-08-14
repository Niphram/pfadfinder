import { autoserialize } from 'cerialize';

import { formula, type Formula } from '../macros';

export const ABILITY_KEYS = ['str', 'dex', 'con', 'int', 'wis', 'cha'] as const;
export type AbilityKey = (typeof ABILITY_KEYS)[number];

export class Ability {
	@autoserialize
	base = formula('10');

	@autoserialize
	bonus = formula('0');

	@autoserialize
	notes = '';

	readonly total: Formula;

	readonly mod: Formula;

	constructor(key: AbilityKey) {
		this.total = formula(`@${key}.base+@race.${key}+@${key}.bonus`);
		this.mod = formula(`floor(@${key}.total/2)-5`);
	}
}
