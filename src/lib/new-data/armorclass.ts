import { autoserialize } from 'cerialize';
import type { Character } from './character';
import type { AbilityKey } from './keys';
import { get } from './util/get';

export class ArmorClass {
	constructor(private char: Character) {}

	@autoserialize
	primaryAbility: AbilityKey = 'dex';

	@autoserialize
	secondaryAbility?: AbilityKey;

	get abilityMod() {
		return this.char[this.primaryAbility].mod + (get(this.char, this.secondaryAbility)?.mod ?? 0);
	}

	get total() {
		return 10 + this.abilityMod;
	}

	get touch() {
		return 10 + this.abilityMod;
	}

	get flatFooted() {
		return 10 + this.abilityMod;
	}
}
