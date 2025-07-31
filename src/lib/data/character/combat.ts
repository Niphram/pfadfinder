import { nanoid } from 'nanoid';

import { array, boolean, object, string } from '$lib/serde';

import { Derive, Macro, macro } from '../macros';
import type { AbilityKey } from './abilities.svelte';

export const sizeKeys = [
	'fine',
	'diminutive',
	'tiny',
	'small',
	'medium',
	'large',
	'huge',
	'gargantuan',
	'colossal',
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
	colossal: { ability: 'str', mod: +8 },
};

export class SpellResistance {
	@macro
	base = new Macro('0');

	@macro
	misc = new Macro('0');

	notes = string('', { maxLength: 1000 });

	readonly total = new Derive(
		(c) => c.combat.sr.value.base.eval(c) + c.combat.sr.value.misc.eval(c),
	);
}

export class BaseAttackBonus {
	notes = string('', { maxLength: 1000 });

	readonly mod = new Derive((c) => c.classes.bab);
}

export class CombatManeuverBonus {
	notes = string('', { maxLength: 1000 });

	readonly mod = new Derive((c) => {
		const { ability, mod } = sizeModifiers[c.race.size];
		return c.combat.bab.value.mod.eval(c) + mod + c[ability].mod.eval(c);
	});
}

export class CombatManeuverDefense {
	notes = string('', { maxLength: 1000 });

	readonly mod = new Derive((c) => {
		const { mod } = sizeModifiers[c.race.size];
		return 10 + c.combat.bab.value.mod.eval(c) + c.str.mod.eval(c) + c.dex.mod.eval(c) + mod;
	});
}

export const ATTACK_TYPES = [
	'meelee',
	'ranged',
	'cmb',
	'babFull',
	'babMax',
	'flurryOfBlows',
	'none',
] as const;
export type AttackType = (typeof ATTACK_TYPES)[number];

export class AttackRoll {
	baseModifier = string<AttackType>('babFull');

	abilityModifier = string<AbilityKey | 'none'>('none');

	@macro
	bonusModifier = new Macro('0');

	versus = string('AC');

	critRange = string('20');

	range = string('');

	readonly baseModValue = new Derive((c) =>
		// TODO: Check this
		this.baseModifier.value === 'none' ? 0
		: this.baseModifier.value === 'babMax' ? c.combat.bab.value.mod.eval(c)
		: this.baseModifier.value === 'babFull' ? c.combat.bab.value.mod.eval(c)
		: this.baseModifier.value === 'cmb' ? c.combat.cmb.value.mod.eval(c)
		: this.baseModifier.value === 'meelee' ? c.combat.bab.value.mod.eval(c) + c.str.mod.eval(c)
		: this.baseModifier.value === 'ranged' ? c.combat.bab.value.mod.eval(c) + c.dex.mod.eval(c)
		: this.baseModifier.value === 'flurryOfBlows' ? 0
		: 0,
	);

	readonly abilityModValue = new Derive((c) =>
		this.abilityModifier.value !== 'none' ? c[this.abilityModifier.value].mod.eval(c) : 0,
	);
}

export class Damage {
	damage = string('');
}

export class Attack {
	id = nanoid();

	name = string('Unnamed Attack');

	category = string('');

	type = string('');

	hasAttack = boolean(false);

	attack = object(new AttackRoll());

	hasDamage = boolean(false);

	damage = object(new Damage());

	notes = string('', { maxLength: 1000 });

	readonly attackBonus = new Derive((c) => {
		let total = this.attack.value.baseModValue.eval(c);
		total += this.attack.value.abilityModValue.eval(c);
		const bonus = this.attack.value.bonusModifier.eval(c) ?? 0;
		total += Number.isNaN(bonus) ? 0 : bonus;
		return total;
	});
}

export class Combat {
	cmbAbility = string<AbilityKey>('str');

	meeleeAbility = string<AbilityKey>('str');

	rangedAbility = string<AbilityKey>('dex');

	sr = object(new SpellResistance());

	bab = object(new BaseAttackBonus());

	cmb = object(new CombatManeuverBonus());

	cmd = object(new CombatManeuverDefense());

	attacks = array(() => object(new Attack()), []);
}
