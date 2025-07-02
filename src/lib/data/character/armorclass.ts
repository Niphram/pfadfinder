import { autoserialize } from 'cerialize';

import { Derive, Macro, macro } from '../macros';
import type { AbilityKey } from './abilities';

export class ArmorClass {
	@autoserialize
	primaryAbility: AbilityKey = 'dex';

	@autoserialize
	secondaryAbility?: AbilityKey;

	@macro
	bonusAc = new Macro('0');

	@macro
	bonusTouch = new Macro('0');

	@macro
	bonusFf = new Macro('0');

	@autoserialize
	notes = '';

	readonly abilityMod = new Derive((c) => {
		const primaryMax = this.primaryAbility === 'dex' ? c.equipment.maxDexBonus : Infinity;
		const secondaryMax = this.secondaryAbility === 'dex' ? c.equipment.maxDexBonus : Infinity;

		return (
			Math.min(c[this.primaryAbility].mod.eval(c), primaryMax) +
			(this.secondaryAbility ? Math.min(c[this.secondaryAbility].mod.eval(c), secondaryMax) : 0)
		);
	});

	readonly total = new Derive(
		(c) => 10 + c.ac.abilityMod.eval(c) + c.equipment.acBonus + this.bonusAc.eval(c),
	);

	readonly touch = new Derive((c) => 10 + c.ac.abilityMod.eval(c) + this.bonusTouch.eval(c));

	readonly flatFooted = new Derive(
		(c) => 10 + c.equipment.acBonus + Math.min(c.ac.abilityMod.eval(c), 0) + this.bonusFf.eval(c),
	);
}
