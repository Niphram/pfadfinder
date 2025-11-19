import { ClassSerializer, derive, macro, number, string } from '$lib/serde';

import { Character } from './character.svelte';

export const ABILITY_KEYS = ['str', 'dex', 'con', 'int', 'wis', 'cha'] as const;
export type AbilityKey = (typeof ABILITY_KEYS)[number];

export class Ability extends ClassSerializer {
	base = macro('10', { min: 0 });

	bonus = macro('0');

	temp = macro('0');

	damage = number(0, { min: 0 });

	notes = string('', { maxLength: 2000 });

	readonly damageMod = $derived(Math.trunc(this.damage.value / 2));

	readonly total = derive<Character>(
		(c) =>
			c[this.key].base +
			c.race[this.key] +
			c[this.key].bonus +
			c[this.key].temp,
	);

	readonly totalNoTemp = derive<Character>(
		(c) => c[this.key].base + c.race[this.key] + c[this.key].bonus,
	);

	readonly mod = derive<Character>(
		(c) => Math.floor(c[this.key].total / 2) - 5 - this.damageMod,
	);

	readonly skillCheckMod = this.mod;

	constructor(public readonly key: AbilityKey) {
		super();

		if (this.key === 'dex' || this.key === 'str') {
			this.skillCheckMod = derive<Character>(
				(c) => this.mod.eval(c) + c.equipment.armorCheckPenalty,
			);
		}
	}
}
