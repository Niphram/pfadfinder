import {
	ClassSerializer,
	MappedBoolWrapper,
	MappedNumberWrapper,
} from '$lib/serde';

import { type AbilityKey } from './abilities.svelte';
import { type SaveKey } from './saves.svelte';
import { type SkillKey } from './skills.svelte';

export function simpleCondition<T>(value: boolean, active: T[]) {
	return new MappedBoolWrapper(value, (v) => (v ? active : []));
}

export function scalarCondition<T>(value: number, map: (v: number) => T) {
	return new MappedNumberWrapper(value, map);
}

const C = {
	acLooseDex: (message: string) =>
		({
			type: 'acLooseDex',
			value: 1,
			message,
		}) as const,
	ac: (value: number, message: string) =>
		({
			type: 'ac',
			value,
			message,
		}) as const,
	ability: (key: AbilityKey, value: number, message: string) =>
		({
			type: key,
			value,
			message,
		}) as const,
	skillAbility: (key: AbilityKey, value: number, message: string) =>
		({
			type: `${key}_skill`,
			value,
			message,
		}) as const,
	skill: (key: SkillKey, value: number, message: string) =>
		({
			type: 'skill',
			key,
			value,
			message,
		}) as const,
	// Will be added to meelee and ranged penalties as well
	attacks: (value: number, message: string) =>
		({
			type: 'attacks',
			value,
			message,
		}) as const,
	meeleeAtk: (value: number, message: string) =>
		({
			type: 'meelee_atk',
			value,
			message,
		}) as const,
	rangedAtk: (value: number, message: string) =>
		({
			type: 'ranged_atk',
			value,
			message,
		}) as const,
	cmd: (value: number, message: string) =>
		({
			type: 'cmd',
			value,
			message,
		}) as const,
	save: (key: SaveKey, value: number, message: string) =>
		({
			type: key,
			value,
			message,
		}) as const,
	maxHp: (value: number, message: string) =>
		({
			type: 'max_hp',
			value,
			message,
		}) as const,
	cl: (value: number, message: string) =>
		({
			type: 'cl',
			value,
			message,
		}) as const,

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
} satisfies Record<string, (...args: any) => { type: string; message: string }>;

export type ConditionEffectKey = ReturnType<(typeof C)[keyof typeof C]>['type'];
export type Condition = ReturnType<(typeof C)[keyof typeof C]>;

function conditionAggregate(
	conditions: Condition[][],
	type: ConditionEffectKey,
) {
	const result = {
		mod: 0,
		messages: [] as string[],
	};

	conditions.forEach((effects) => {
		effects.forEach((e) => {
			if (e.type === type) {
				result.mod += e.value;
				result.messages.push(e.message);
			}
		});
	});

	return result;
}

function conditionAggregateSkill(conditions: Condition[][], key: SkillKey) {
	const result = {
		mod: 0,
		messages: [] as string[],
	};

	conditions.forEach((effects) => {
		effects.forEach((e) => {
			if (e.type === 'skill' && e.key === key) {
				result.mod += e.value;
				result.messages.push(e.message);
			}
		});
	});

	return result;
}

function combine(...results: { mod: number; messages: string[] }[]) {
	const result = {
		mod: 0,
		messages: [] as string[],
	};

	results.forEach((r) => {
		result.mod += r.mod;
		result.messages.push(...r.messages);
	});

	return result;
}

export class Conditions extends ClassSerializer {
	// Condition toggles

	blinded = simpleCondition(false, [
		C.acLooseDex('[Blinded] No DEX-Bonus to AC'),
		C.ac(-2, '[Blinded] -2 to AC'),
		C.skillAbility('str', -4, '[Blinded] -4 to most STR skills'),
		C.skillAbility('dex', -4, '[Blinded] -4 to most DEX skills'),
		C.skill('perception', -4, '[Blinded] -4 (only opposed perception checks)'),
	]);

	cowering = simpleCondition(false, [
		C.acLooseDex('[Cowering] No DEX-Bonus to AC'),
		C.ac(-2, '[Cowering] -2 to AC'),
	]);

	dazzled = simpleCondition(false, [
		C.attacks(-1, '[Dazzled] -1 to attack rolls'),
		C.skill(
			'perception',
			-1,
			'[Dazzled] -1 (only sight based perception checks)',
		),
	]);

	fatigued = simpleCondition(false, [
		// Neither Run nor Charge
		C.ability('str', -2, 'Fatigued'), // These don't just affect checks?
		C.ability('dex', -2, 'Fatigued'),
	]);

	negative_levels = scalarCondition(0, (v) =>
		v > 0 ?
			[
				C.ability('str', -v, `[Negative Levels] ${-v}`),
				C.ability('dex', -v, `[Negative Levels] ${-v}`),
				C.ability('con', -v, `[Negative Levels] ${-v}`),
				C.ability('int', -v, `[Negative Levels] ${-v}`),
				C.ability('wis', -v, `[Negative Levels] ${-v}`),
				C.ability('cha', -v, `[Negative Levels] ${-v}`),
				C.attacks(-v, `[Negative Levels] ${-v} to attack rolls`),
				C.cmd(-v, `[Negative Levels] ${-v}`),
				C.skillAbility('str', -v, `[Negative Levels] ${-v}`),
				C.skillAbility('dex', -v, `[Negative Levels] ${-v}`),
				C.skillAbility('con', -v, `[Negative Levels] ${-v}`),
				C.skillAbility('int', -v, `[Negative Levels] ${-v}`),
				C.skillAbility('wis', -v, `[Negative Levels] ${-v}`),
				C.skillAbility('cha', -v, `[Negative Levels] ${-v}`),
				C.save('fort', -v, `[Negative Levels] ${-v}`),
				C.save('ref', -v, `[Negative Levels] ${-v}`),
				C.save('will', -v, `[Negative Levels] ${-v}`),
				C.maxHp(-v * 5, `[Negative Levels] ${-v * 5} HP`),
			]
		:	[],
	);

	// Modifiers
	private readonly effects = $derived(
		[
			this.blinded.mapped,
			this.cowering.mapped,
			this.dazzled.mapped,
			this.fatigued.mapped,
			this.negative_levels.mapped,
		].filter((c) => c.length > 0),
	);

	public readonly mods = new Mods(() => this.effects);
}

class Mods {
	private get effects() {
		return this.effectsGetter();
	}

	constructor(private readonly effectsGetter: () => Condition[][]) {}

	readonly acLooseDex = $derived(
		conditionAggregate(this.effects, 'acLooseDex'),
	);
	readonly ac = $derived(conditionAggregate(this.effects, 'ac'));

	readonly fort = $derived(conditionAggregate(this.effects, 'fort'));
	readonly ref = $derived(conditionAggregate(this.effects, 'ref'));
	readonly will = $derived(conditionAggregate(this.effects, 'will'));

	readonly str = $derived(conditionAggregate(this.effects, 'str'));
	readonly dex = $derived(conditionAggregate(this.effects, 'dex'));
	readonly con = $derived(conditionAggregate(this.effects, 'con'));
	readonly int = $derived(conditionAggregate(this.effects, 'int'));
	readonly wis = $derived(conditionAggregate(this.effects, 'wis'));
	readonly cha = $derived(conditionAggregate(this.effects, 'cha'));

	readonly attacks = $derived(conditionAggregate(this.effects, 'attacks'));
	readonly meeleeAtk = $derived(
		combine(this.attacks, conditionAggregate(this.effects, 'meelee_atk')),
	);
	readonly rangedAtk = $derived(
		combine(this.attacks, conditionAggregate(this.effects, 'ranged_atk')),
	);

	readonly cmd = $derived(conditionAggregate(this.effects, 'cmd'));

	readonly strSkill = $derived(conditionAggregate(this.effects, 'str_skill'));
	readonly dexSkill = $derived(conditionAggregate(this.effects, 'dex_skill'));
	readonly conSkill = $derived(conditionAggregate(this.effects, 'con_skill'));
	readonly intSkill = $derived(conditionAggregate(this.effects, 'int_skill'));
	readonly wisSkill = $derived(conditionAggregate(this.effects, 'wis_skill'));
	readonly chaSkill = $derived(conditionAggregate(this.effects, 'cha_skill'));

	readonly acrobatics = $derived(
		conditionAggregateSkill(this.effects, 'acrobatics'),
	);
	readonly appraise = $derived(
		conditionAggregateSkill(this.effects, 'appraise'),
	);
	readonly bluff = $derived(conditionAggregateSkill(this.effects, 'bluff'));
	readonly climb = $derived(conditionAggregateSkill(this.effects, 'climb'));
	readonly craft = $derived(conditionAggregateSkill(this.effects, 'craft'));
	readonly diplomacy = $derived(
		conditionAggregateSkill(this.effects, 'diplomacy'),
	);
	readonly disableDevice = $derived(
		conditionAggregateSkill(this.effects, 'disableDevice'),
	);
	readonly disguise = $derived(
		conditionAggregateSkill(this.effects, 'disguise'),
	);
	readonly escapeArtist = $derived(
		conditionAggregateSkill(this.effects, 'escapeArtist'),
	);
	readonly fly = $derived(conditionAggregateSkill(this.effects, 'fly'));
	readonly handleAnimal = $derived(
		conditionAggregateSkill(this.effects, 'handleAnimal'),
	);
	readonly heal = $derived(conditionAggregateSkill(this.effects, 'heal'));
	readonly intimidate = $derived(
		conditionAggregateSkill(this.effects, 'intimidate'),
	);
	readonly knowledgeArcana = $derived(
		conditionAggregateSkill(this.effects, 'knowledgeArcana'),
	);
	readonly knowledgeDungeoneering = $derived(
		conditionAggregateSkill(this.effects, 'knowledgeDungeoneering'),
	);
	readonly knowledgeEngineering = $derived(
		conditionAggregateSkill(this.effects, 'knowledgeEngineering'),
	);
	readonly knowledgeGeography = $derived(
		conditionAggregateSkill(this.effects, 'knowledgeGeography'),
	);
	readonly knowledgeHistory = $derived(
		conditionAggregateSkill(this.effects, 'knowledgeHistory'),
	);
	readonly knowledgeLocal = $derived(
		conditionAggregateSkill(this.effects, 'knowledgeLocal'),
	);
	readonly knowledgeNature = $derived(
		conditionAggregateSkill(this.effects, 'knowledgeNature'),
	);
	readonly knowledgeNobility = $derived(
		conditionAggregateSkill(this.effects, 'knowledgeNobility'),
	);
	readonly knowledgePlanes = $derived(
		conditionAggregateSkill(this.effects, 'knowledgePlanes'),
	);
	readonly knowledgeReligion = $derived(
		conditionAggregateSkill(this.effects, 'knowledgeReligion'),
	);
	readonly linguistics = $derived(
		conditionAggregateSkill(this.effects, 'linguistics'),
	);
	readonly perception = $derived(
		conditionAggregateSkill(this.effects, 'perception'),
	);
	readonly perform = $derived(conditionAggregateSkill(this.effects, 'perform'));
	readonly profession = $derived(
		conditionAggregateSkill(this.effects, 'profession'),
	);
	readonly ride = $derived(conditionAggregateSkill(this.effects, 'ride'));
	readonly senseMotive = $derived(
		conditionAggregateSkill(this.effects, 'senseMotive'),
	);
	readonly sleightOfHand = $derived(
		conditionAggregateSkill(this.effects, 'sleightOfHand'),
	);
	readonly spellcraft = $derived(
		conditionAggregateSkill(this.effects, 'spellcraft'),
	);
	readonly stealth = $derived(conditionAggregateSkill(this.effects, 'stealth'));
	readonly survival = $derived(
		conditionAggregateSkill(this.effects, 'survival'),
	);
	readonly swim = $derived(conditionAggregateSkill(this.effects, 'swim'));
	readonly useMagicDevice = $derived(
		conditionAggregateSkill(this.effects, 'useMagicDevice'),
	);

	readonly maxHp = $derived(conditionAggregate(this.effects, 'max_hp'));

	readonly cl = $derived(conditionAggregate(this.effects, 'cl'));
}
