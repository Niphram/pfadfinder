import { autoserialize, autoserializeAs } from 'cerialize';

import { formula } from '../makros';
import type { AbilityKey } from './abilities';

export const sizeKeys = [
	'fine',
	'diminutive',
	'tiny',
	'small',
	'medium',
	'large',
	'huge',
	'gargantuan',
	'colossal'
];
export type SizeKey = (typeof sizeKeys)[number];

const sizeModifiers: Record<SizeKey, { mod: number; ability: AbilityKey }> = {
	fine: { ability: 'dex', mod: -8 },
	diminutive: { ability: 'dex', mod: -4 },
	tiny: { ability: 'dex', mod: -2 },
	small: { ability: 'str', mod: -1 },
	medium: { ability: 'str', mod: 0 },
	large: { ability: 'str', mod: 1 },
	huge: { ability: 'str', mod: +2 },
	gargantuan: { ability: 'str', mod: +4 },
	colossal: { ability: 'str', mod: +8 }
};

export class SpellResistance {
	@autoserialize
	base = formula('0');

	@autoserialize
	misc = formula('0');

	@autoserialize
	notes = '';

	get total() {
		return formula(`@combat.sr.base+@combat.sr.misc`);
	}
}

export class BaseAttackBonus {
	@autoserialize
	notes = '';

	get mod() {
		return formula(`@classes.bab`);
	}
}

export class CombatManeuverBonus {
	@autoserialize
	notes = '';

	get mod() {
		// const { ability, mod } = sizeModifiers[char.race.size]
		// ToDo: Nested formulas?
		return formula(`@combat.bab.mod`);
	}
}

export class CombatManeuverDefense {
	@autoserialize
	notes = '';

	get mod() {
		// const { ability, mod } = sizeModifiers[char.race.size]
		// ToDo: Nested formulas?
		return formula(`10+@combat.bab.mod+@str.mod+@dex.mod`);
	}
}

export class Combat {
	@autoserialize
	cmbAbility: AbilityKey = 'str';

	@autoserialize
	meeleeAbility: AbilityKey = 'str';

	@autoserialize
	rangedAbility: AbilityKey = 'dex';

	@autoserializeAs(SpellResistance)
	sr = new SpellResistance();

	@autoserializeAs(BaseAttackBonus)
	bab = new BaseAttackBonus();

	@autoserializeAs(CombatManeuverBonus)
	cmb = new CombatManeuverBonus();

	@autoserializeAs(CombatManeuverBonus)
	cmd = new CombatManeuverDefense();
}
