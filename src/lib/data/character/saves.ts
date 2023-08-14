import { autoserialize } from 'cerialize';

import { formula, type Formula } from '../macros';
import type { AbilityKey } from './abilities';

export const SAVE_KEYS = ['fort', 'ref', 'will'] as const;
export type SaveKey = (typeof SAVE_KEYS)[number];

const DefaultBaseAbility = {
	fort: 'con',
	ref: 'dex',
	will: 'wis'
} as const;

export class Save {
	@autoserialize
	ability: AbilityKey;

	@autoserialize
	bonus = formula('0');

	@autoserialize
	misc = formula('0');

	@autoserialize
	notes = '';

	@autoserialize
	readonly mod: Formula;

	constructor(key: SaveKey) {
		this.ability = DefaultBaseAbility[key];
		this.mod = formula(`@classes.${key}+@${this.ability}.mod+@${key}.bonus+@${key}.misc`);
	}
}
