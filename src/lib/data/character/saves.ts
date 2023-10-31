import { autoserialize } from 'cerialize';

import { Derive, Macro, macro } from '../macros';
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

	@macro
	bonus = new Macro('0');

	@macro
	misc = new Macro('0');

	@autoserialize
	notes = '';

	readonly mod = new Derive(
		(c) =>
			c.classes[this.key] +
			c[this.ability].mod.eval(c) +
			c[this.key].bonus.eval(c) +
			c[this.key].misc.eval(c)
	);

	constructor(private key: SaveKey) {
		this.ability = DefaultBaseAbility[key];
	}
}
