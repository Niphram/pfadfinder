import { nanoid } from 'nanoid';

import { parseTextWithMacros } from '$lib/macro/text';
import {
	array,
	boolean,
	ClassSerializer,
	derive,
	enumeration,
	macro,
	string,
} from '$lib/serde';
import { withSign } from '$lib/utils';

import { ABILITY_KEYS, type AbilityKey } from './abilities.svelte';
import { Character } from './character.svelte';

export const SIZES = [
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
export type SizeKey = (typeof SIZES)[number];

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

function attackArray(attackCount: number, maxAttack: number) {
	return Array.from({ length: attackCount }, (_, idx) => maxAttack - idx * 5);
}

export class SpellResistance extends ClassSerializer {
	base = macro('0');

	misc = macro('0');

	notes = string('', { maxLength: 1000 });

	readonly total = derive<Character>(
		(c) => c.combat.sr.base + c.combat.sr.misc,
	);
}

export class BaseAttackBonus extends ClassSerializer {
	notes = string('', { maxLength: 1000 });

	readonly mod = derive<Character>((c) => c.classes.bab);
}

export class CombatManeuverBonus extends ClassSerializer {
	notes = string('', { maxLength: 1000 });

	readonly mod = derive<Character>((c) => {
		const { ability, mod } = sizeModifiers[c.race.size];
		return c.combat.bab.mod + mod + c[ability].mod;
	});
}

export class CombatManeuverDefense extends ClassSerializer {
	notes = string('', { maxLength: 1000 });

	readonly mod = derive<Character>((c) => {
		const { mod } = sizeModifiers[c.race.size];
		return 10 + c.combat.bab.mod + c.str.mod + c.dex.mod + mod;
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

export class AttackRoll extends ClassSerializer {
	baseModifier = enumeration(ATTACK_TYPES, 'babFull');

	abilityModifier = enumeration(ABILITY_KEYS, null, { optional: true });

	bonusModifier = macro('', { optional: true });

	versus = string('AC', { maxLength: 100 });

	critRange = string('20', { maxLength: 100 });

	range = string('', { maxLength: 100 });

	readonly baseModValue = derive<Character>((c) =>
		// TODO: Check this
		this.baseModifier.value === 'none' ? 0
		: this.baseModifier.value === 'babMax' ? c.combat.bab.mod
		: this.baseModifier.value === 'babFull' ? c.combat.bab.mod
		: this.baseModifier.value === 'cmb' ? c.combat.cmb.mod
		: this.baseModifier.value === 'meelee' ? c.combat.bab.mod + c.str.mod
		: this.baseModifier.value === 'ranged' ? c.combat.bab.mod + c.dex.mod
		: this.baseModifier.value === 'flurryOfBlows' ? 0
		: 0,
	);

	readonly abilityModValue = derive<Character>((c) =>
		this.abilityModifier.value ? c[this.abilityModifier.value].mod : 0,
	);

	readonly attacks = derive<Character, number[]>((c) => {
		const bab = c.combat.bab.mod;
		const fullAttackCount = Math.max(Math.ceil(bab / 5), 1);
		const abilityMod =
			this.abilityModifier.value ? c[this.abilityModifier.value].mod : 0;
		const bonus = this.bonusModifier.eval(c) ?? 0;

		switch (this.baseModifier.value) {
			case 'meelee':
				return attackArray(
					fullAttackCount,
					bab + c.str.mod + abilityMod + bonus,
				);
			case 'ranged':
				return attackArray(
					fullAttackCount,
					bab + c.dex.mod + abilityMod + bonus,
				);
			case 'babFull':
				return attackArray(fullAttackCount, bab + abilityMod + bonus);
			case 'babMax':
				return attackArray(1, bab + abilityMod + bonus);
			case 'cmb':
				return attackArray(1, c.combat.cmb.mod + abilityMod + bonus);
			default:
				return attackArray(1, abilityMod + bonus);
		}
	});
}

export class Damage extends ClassSerializer {
	damage = string('', { maxLength: 1000 });
}

export class Attack extends ClassSerializer {
	id = nanoid();

	open = boolean(false);

	name = string('Unnamed Attack', { minLength: 1, maxLength: 100 });

	category = string('', { maxLength: 100 });

	type = string('', { maxLength: 100 });

	hasAttack = boolean(false);

	attack = new AttackRoll();

	hasDamage = boolean(false);

	damage = new Damage();

	showNotes = boolean(true);

	notes = string('', { maxLength: 1000 });

	readonly attackBonus = derive<Character>((c) => {
		let total = this.attack.baseModValue.eval(c);
		total += this.attack.abilityModValue.eval(c);
		const bonus = this.attack.bonusModifier.eval(c) ?? 0;
		total += Number.isNaN(bonus) ? 0 : bonus;
		return total;
	});

	readonly details = derive<Character, [label: string, value: string][]>(
		(c) => {
			const details: [string, string | undefined][] = [];

			if (this.hasAttack.value) {
				details.push(['Crit Range', this.attack.critRange.value]);
				details.push([
					'Attacks',
					this.attack.attacks.eval(c).map(withSign).join('/'),
				]);
				details.push(['Range', this.attack.range.value]);
			}

			if (this.hasDamage.value) {
				details.push([
					'Damage',
					parseTextWithMacros(this.damage.damage.value, c),
				]);
			}

			return details.filter((e) => !!e[1]) as [string, string][];
		},
	);
}

export class Combat extends ClassSerializer {
	cmbAbility = string<AbilityKey>('str');

	meeleeAbility = string<AbilityKey>('str');

	rangedAbility = string<AbilityKey>('dex');

	sr = new SpellResistance();

	bab = new BaseAttackBonus();

	cmb = new CombatManeuverBonus();

	cmd = new CombatManeuverDefense();

	attacks = array(() => new Attack(), []);
}
