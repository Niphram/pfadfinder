import { autoserialize } from 'cerialize';

import { Derive } from '../macros';
import type { AbilityKey } from './abilities';

export class ArmorClass {
	@autoserialize
	primaryAbility: AbilityKey = 'dex';

	@autoserialize
	secondaryAbility?: AbilityKey;

	readonly abilityMod = new Derive(
		(c) =>
			c[this.primaryAbility].mod.eval(c) +
			(this.secondaryAbility ? c[this.secondaryAbility].mod.eval(c) : 0)
	);

	readonly total = new Derive((c) => 10 + c.ac.abilityMod.eval(c) + c.equipment.acBonus);

	readonly touch = new Derive((c) => 10 + c.ac.abilityMod.eval(c));

	readonly flatFooted = new Derive((c) => 10 + c.equipment.acBonus);
}
