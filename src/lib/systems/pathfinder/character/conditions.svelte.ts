import { boolean, ClassSerializer } from '$lib/serde';
import { mapSum } from '$lib/utils';

import type { AbilityKey } from './abilities.svelte';
import type { AttackRoll, AttackType } from './combat.svelte';
import type { Skill, SkillKey } from './skills.svelte';

function looseDexBonusToAc(message: string) {
	return {
		type: 'looseDexBonusToAc',
		message,
	} as const;
}

function acMod(value: number, message: string) {
	return {
		type: 'acMod',
		value,
		message,
	} as const;
}

function skillModByAbility(key: AbilityKey, value: number, message: string) {
	return {
		type: 'skillModByAbility',
		key,
		value,
		message,
	} as const;
}

function skillModByName(key: SkillKey, value: number, message: string) {
	return {
		type: 'skillModByName',
		key,
		value,
		message,
	} as const;
}

function attackRollMod(value: number, message: string) {
	return {
		type: 'attackRollMod',
		value,
		message,
	} as const;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function attackRollModByType(key: AttackType, value: number, message: string) {
	return {
		type: 'attackRollModByType',
		key,
		value,
		message,
	} as const;
}

type Condition = ReturnType<
	| typeof looseDexBonusToAc
	| typeof acMod
	| typeof skillModByAbility
	| typeof skillModByName
	| typeof attackRollMod
	| typeof attackRollModByType
>;

function conditionsSum<T>(conditions: T[][], get: (c: T) => number) {
	return mapSum(conditions, (c) => mapSum(c, get));
}

const CONDITIONS = {
	blinded: [
		looseDexBonusToAc('TODO'),
		acMod(-2, '?'),
		skillModByAbility('str', -4, 'Most str skills'),
		skillModByAbility('dex', -4, 'Most dex skills'),
		skillModByName('perception', -4, 'Only opposed perception checks'),
	],
	cowering: [looseDexBonusToAc('Cowering'), acMod(-2, 'Cowering')],
	dazzled: [
		attackRollMod(-1, 'Todo'),
		skillModByName('perception', -1, 'TODO'),
	],
};

export class Conditions extends ClassSerializer {
	// Condition toggles

	blinded = boolean(false);

	cowering = boolean(false);

	dazzled = boolean(false);

	readonly activeConditions: Condition[][] = $derived(
		[
			this.blinded.value && CONDITIONS.blinded,
			this.cowering.value && CONDITIONS.cowering,
			this.dazzled.value && CONDITIONS.dazzled,
		].filter(Boolean),
	);

	// Modifier reducers

	readonly acMod = $derived(
		conditionsSum(this.activeConditions, (c) =>
			c.type === 'acMod' ? c.value : 0,
		),
	);

	readonly looseAcDexBonus = $derived(
		this.activeConditions.some((conditions) =>
			conditions.some((c) => c.type === 'looseDexBonusToAc'),
		),
	);

	skillCheckModifier(skill: Skill) {
		return conditionsSum(this.activeConditions, (c) => {
			if (c.type === 'skillModByAbility' && c.key === skill.ability.value) {
				return c.value;
			}

			if (c.type === 'skillModByName' && c.key === skill.key) {
				return c.value;
			}

			return 0;
		});
	}

	attackRollModifier(attackRoll: AttackRoll) {
		return conditionsSum(this.activeConditions, (c) => {
			switch (c.type) {
				case 'attackRollMod':
					return c.value;
				case 'attackRollModByType':
					return c.key === attackRoll.baseModifier.value ? c.value : 0;

				default:
					return 0;
			}
		});
	}
}
