import { derive, enumeration, EnumWrapper, macro, string } from '$lib/serde';

import type { AbilityKey } from './abilities.svelte';
import { Character } from './character.svelte';

export const SAVE_KEYS = ['fort', 'ref', 'will'] as const;
export type SaveKey = (typeof SAVE_KEYS)[number];

const DefaultBaseAbility = {
	fort: 'con',
	ref: 'dex',
	will: 'wis',
} as const;

export class Save {
	ability: EnumWrapper<AbilityKey, false>;

	bonus = macro('0');

	misc = macro('0');

	notes = string('');

	readonly mod = derive<Character>(
		(c) => c.classes[this.key] + c[this.ability.value].mod + c[this.key].bonus + c[this.key].misc,
	);

	constructor(public readonly key: SaveKey) {
		this.ability = enumeration(DefaultBaseAbility[key]);
	}
}
