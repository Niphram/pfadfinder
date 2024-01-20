import { autoserialize, autoserializeAs } from 'cerialize';

import { Derive, Macro, macro } from '../macros';
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
	@macro
	base = new Macro('0');

	@macro
	misc = new Macro('0');

	@autoserialize
	notes = '';

	readonly total = new Derive((c) => c.combat.sr.base.eval(c) + c.combat.sr.misc.eval(c));
}

export class BaseAttackBonus {
	@autoserialize
	notes = '';

	readonly mod = new Derive((c) => c.classes.bab);
}

export class CombatManeuverBonus {
	@autoserialize
	notes = '';

	readonly mod = new Derive((c) => {
		const { ability, mod } = sizeModifiers[c.race.size];
		return c.combat.bab.mod.eval(c) + mod + c[ability].mod.eval(c);
	});
}

export class CombatManeuverDefense {
	@autoserialize
	notes = '';

	readonly mod = new Derive((c) => {
		const { mod } = sizeModifiers[c.race.size];
		return 10 + c.combat.bab.mod.eval(c) + c.str.mod.eval(c) + c.dex.mod.eval(c) + mod;
	});
}

export const ATTACK_TYPES = [
	'meelee',
	'ranged',
	'cmb',
	'babFull',
	'babMax',
	'flurryOfBlows',
	'none'
] as const;
export type AttackType = (typeof ATTACK_TYPES)[number];

export class AttackRoll {
	@autoserialize
	baseModifier: AttackType = 'babFull';

	@autoserialize
	abilityModifier: AbilityKey | 'none' = 'none';

	@macro
	bonusModifier = new Macro('0');

	@autoserialize
	versus = 'AC';

	@macro
	critRange = new Macro('20');

	@autoserialize
	range = '';

	readonly baseModValue = new Derive((c) =>
		// TODO: Check this
		this.baseModifier === 'none' ? 0
		: this.baseModifier === 'babMax' ? c.combat.bab.mod.eval(c)
		: this.baseModifier === 'babFull' ? c.combat.bab.mod.eval(c)
		: this.baseModifier === 'cmb' ? c.combat.cmb.mod.eval(c)
		: this.baseModifier === 'meelee' ? c.combat.bab.mod.eval(c) + c.str.mod.eval(c)
		: this.baseModifier === 'ranged' ? c.combat.bab.mod.eval(c) + c.dex.mod.eval(c)
		: this.baseModifier === 'flurryOfBlows' ? 0
		: 0
	);

	readonly abilityModValue = new Derive((c) =>
		this.abilityModifier !== 'none' ? c[this.abilityModifier].mod.eval(c) : 0
	);
}

export class Damage {
	@autoserialize
	damage = '';
}

export class Attack {
	@autoserialize
	name = 'Unnamed Attack';

	@autoserialize
	category = '';

	@autoserialize
	type = '';

	@autoserialize
	hasAttack = false;

	@autoserializeAs(AttackRoll)
	attack = new AttackRoll();

	@autoserialize
	hasDamage = false;

	@autoserializeAs(Damage)
	damage = new Damage();

	@autoserialize
	notes = '';

	readonly attackBonus = new Derive((c) => {
		let total = this.attack.baseModValue.eval(c);
		total += this.attack.abilityModValue.eval(c);
		const bonus = this.attack.bonusModifier.eval(c) ?? 0;
		total += Number.isNaN(bonus) ? 0 : bonus;
		return total;
	});
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

	@autoserializeAs(Attack)
	attacks: Attack[] = [];
}
