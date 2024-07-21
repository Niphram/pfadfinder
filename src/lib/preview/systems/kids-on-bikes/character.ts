import type { CharacterBase } from '$lib/preview/types/character';
import { autoserialize, serialize } from 'cerialize';
import { nanoid } from 'nanoid';

export const DICE = [4, 6, 8, 10, 12, 20] as const;
export type Dice = (typeof DICE)[number];

export const AGE_RANGE = ['child', 'teen', 'adult'] as const;
export type AgeRange = (typeof AGE_RANGE)[number];

export const ABILITY_KEYS = ['fight', 'flight', 'brains', 'brawn', 'charm', 'grit'] as const;
export type AbilityKey = (typeof ABILITY_KEYS)[number];

export class Ability {
	die?: Dice;

	bonus: number = 0;
}

export const SKILL_KEYS = [
	'cool_under_pressure',
	'easygoing',
	'gross',
	'heroic',
	'intuitive',
	'loyal',
	'lucky',
	'prepared',
	'protective',
	'quick_healing',
	'rebellious',
	'skilled_at',
	'tough',
	'treasure_hunter',
	'unassuming',
	'wealthy'
] as const;
export type SkillKey = (typeof SKILL_KEYS)[number];

export class KidsOnBikesCharacter implements CharacterBase, Record<AbilityKey, Ability> {
	@autoserialize
	readonly id = nanoid();

	@serialize
	readonly system = 'kids-on-bikes';

	@serialize
	readonly version = 0;

	@autoserialize
	name = 'Unnamed Character';

	adversity_tokens = 0;

	notes = '';

	age = 0;

	fear = '';

	motivation = '';

	flaws = '';

	description = '';

	fight = new Ability();

	flight = new Ability();

	brains = new Ability();

	brawn = new Ability();

	charm = new Ability();

	grit = new Ability();
}
