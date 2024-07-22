import { Derive } from '$lib/preview/macro/derive';
import { autoserialize } from 'cerialize';
import type { AbilityKey } from './ability';
import type { PathfinderCharacter } from './character';

export class ArmorClass {
	@autoserialize
	primaryAbility: AbilityKey = 'dex';

	@autoserialize
	secondaryAbility?: AbilityKey;

	readonly abilityMod = new Derive(
		(c: PathfinderCharacter) =>
			c[this.primaryAbility].mod.eval(c) +
			(this.secondaryAbility ? c[this.secondaryAbility].mod.eval(c) : 0)
	);

	readonly total = new Derive(
		(c: PathfinderCharacter) => 10 + c.ac.abilityMod.eval(c) + c.equipment.acBonus
	);

	readonly touch = new Derive((c: PathfinderCharacter) => 10 + c.ac.abilityMod.eval(c));

	readonly flatFooted = new Derive(
		(c: PathfinderCharacter) => 10 + c.equipment.acBonus + Math.min(c.ac.abilityMod.eval(c), 0)
	);
}
