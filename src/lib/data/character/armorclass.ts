import { autoserialize } from 'cerialize';

import { formula } from '../makros';
import type { AbilityKey } from './abilities';

export class ArmorClass {
	@autoserialize
	primaryAbility: AbilityKey = 'dex';

	@autoserialize
	secondaryAbility?: AbilityKey;

	get abilityMod() {
		return formula(
			`@${this.primaryAbility}.mod${this.secondaryAbility ? `+@${this.secondaryAbility}.mod` : ''}`
		);
	}

	get total() {
		return formula(`10+@ac.abilityMod+@equipment.acBonus`);
	}

	get touch() {
		return formula(`10+@ac.abilityMod`);
	}

	get flatFooted() {
		return formula('10');
	}
}
