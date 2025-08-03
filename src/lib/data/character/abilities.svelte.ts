import { derive, macro, number, string } from '$lib/serde';

import { Character } from './character';

export const ABILITY_KEYS = ['str', 'dex', 'con', 'int', 'wis', 'cha'] as const;
export type AbilityKey = (typeof ABILITY_KEYS)[number];

export class Ability {
	base = macro('10');

	bonus = macro('0');

	temp = macro('0');

	damage = number(0, { min: 0, integer: true });

	notes = string('', { maxLength: 2000 });

	readonly damageMod = $derived(Math.trunc(this.damage.value / 2));

	readonly total = derive<Character>(
		(c) => c[this.key].base + c.race[this.key] + c[this.key].bonus + c[this.key].temp,
	);

	readonly totalNoTemp = derive<Character>(
		(c) => c[this.key].base + c.race[this.key] + c[this.key].bonus,
	);

	readonly mod = derive<Character>((c) => Math.floor(c[this.key].total / 2) - 5 - this.damageMod);

	readonly skillCheckMod = this.mod;

	constructor(private key: AbilityKey) {
		if (this.key === 'dex' || this.key === 'str') {
			this.skillCheckMod = derive<Character>((c) => this.mod + c.equipment.armorCheckPenalty);
		}
	}
}
