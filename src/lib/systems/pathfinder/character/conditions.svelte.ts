import { boolean, ClassSerializer, number } from '$lib/serde';
import { mapSum } from '$lib/utils';

import { Ability, ABILITY_KEYS, type AbilityKey } from './abilities.svelte';
import type { AttackRoll, AttackType } from './combat.svelte';
import { Save, SAVE_KEYS, type SaveKey } from './saves.svelte';
import { SKILL_KEYS, type Skill, type SkillKey } from './skills.svelte';

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

function skillModByName(
	keys: readonly SkillKey[],
	value: number,
	message: string,
) {
	return {
		type: 'skillModByName',
		keys,
		value,
		message,
	} as const;
}

function saveMod(keys: readonly SaveKey[], value: number, message: string) {
	return {
		type: 'save',
		keys,
		value,
		message,
	} as const;
}

function abilityCheckMod(
	keys: readonly AbilityKey[],
	value: number,
	message: string,
) {
	return {
		type: 'abilityCheck',
		keys,
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

function cmbMod(value: number, message: string) {
	return {
		type: 'cmb',
		value,
		message,
	} as const;
}

function cmdMod(value: number, message: string) {
	return {
		type: 'cmd',
		value,
		message,
	} as const;
}

function maxHpMod(value: number, message: string) {
	return {
		type: 'max_hp',
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
	| typeof abilityCheckMod
	| typeof cmbMod
	| typeof cmdMod
	| typeof saveMod
	| typeof maxHpMod
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
		skillModByName(['perception'], -4, 'Only opposed perception checks'),
	],
	cowering: [looseDexBonusToAc('Cowering'), acMod(-2, 'Cowering')],
	dazzled: [
		attackRollMod(-1, 'Todo'),
		skillModByName(['perception'], -1, 'TODO'),
	],
};

export class Conditions extends ClassSerializer {
	// Condition toggles

	blinded = boolean(false);

	cowering = boolean(false);

	dazzled = boolean(false);

	negative_levels = number(0, { min: 0 });

	negative_levels_effects = $derived(
		this.negative_levels.value > 0 ?
			[
				abilityCheckMod(
					ABILITY_KEYS,
					-this.negative_levels.value,
					'Negative Levels',
				),
				attackRollMod(-this.negative_levels.value, 'Negative Levels'),
				cmbMod(-this.negative_levels.value, 'Negative Levels'),
				cmdMod(-this.negative_levels.value, 'Negative Levels'),
				skillModByName(
					SKILL_KEYS,
					-this.negative_levels.value,
					'Negative Levels',
				),
				saveMod(SAVE_KEYS, -this.negative_levels.value, 'Negative Levels'),
				maxHpMod(-this.negative_levels.value * 5, 'Negative Levels'),
			]
		:	[],
	);

	readonly activeConditions: Condition[][] = $derived(
		[
			this.blinded.value && CONDITIONS.blinded,
			this.cowering.value && CONDITIONS.cowering,
			this.dazzled.value && CONDITIONS.dazzled,
			this.negative_levels_effects,
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

	readonly cmbMod = $derived(
		conditionsSum(this.activeConditions, (c) =>
			c.type === 'cmb' ? c.value : 0,
		),
	);

	readonly cmdMod = $derived(
		conditionsSum(this.activeConditions, (c) =>
			c.type === 'cmd' ? c.value : 0,
		),
	);

	readonly maxHpMod = $derived(
		conditionsSum(this.activeConditions, (c) =>
			c.type === 'max_hp' ? c.value : 0,
		),
	);

	readonly levelMod = $derived(this.negative_levels);

	saveMod(save: Save) {
		return conditionsSum(this.activeConditions, (c) =>
			c.type === 'save' && c.keys.includes(save.key) ? c.value : 0,
		);
	}

	abilityCheckMod(ability: Ability) {
		return conditionsSum(this.activeConditions, (c) =>
			c.type === 'abilityCheck' && c.keys.includes(ability.key) ? c.value : 0,
		);
	}

	skillCheckModifier(skill: Skill) {
		return conditionsSum(this.activeConditions, (c) => {
			if (c.type === 'skillModByAbility' && c.key === skill.ability.value) {
				return c.value;
			}

			if (c.type === 'skillModByName' && c.keys.includes(skill.key)) {
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
