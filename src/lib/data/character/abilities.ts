import { autoserialize } from 'cerialize';

import { Derive, Macro, macro } from '../macros';

export const ABILITY_KEYS = ['str', 'dex', 'con', 'int', 'wis', 'cha'] as const;
export type AbilityKey = (typeof ABILITY_KEYS)[number];

export class Ability {
	@macro
	base = new Macro('10');

	@macro
	bonus = new Macro('0');

	@macro
	temp = new Macro('0');

	@autoserialize
	damage = 0;

	@autoserialize
	notes = '';

	get damageMod() {
		return Math.trunc(this.damage / 2);
	}

	readonly total = new Derive(
		(c) =>
			c[this.key].base.eval(c) +
			c.race[this.key].eval(c) +
			c[this.key].bonus.eval(c) +
			c[this.key].temp.eval(c),
	);

	readonly totalNoTemp = new Derive(
		(c) => c[this.key].base.eval(c) + c.race[this.key].eval(c) + c[this.key].bonus.eval(c),
	);

	readonly mod = new Derive((c) => Math.floor(c[this.key].total.eval(c) / 2) - 5 - this.damageMod);

	readonly skillCheckMod = this.mod;

	constructor(private key: AbilityKey) {
		if (this.key === 'dex' || this.key === 'str') {
			this.skillCheckMod = new Derive((c) => this.mod.eval(c) + c.equipment.armorCheckPenalty);
		}
	}
}
