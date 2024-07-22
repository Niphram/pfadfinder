import { autoserialize, autoserializeAs, inheritSerialization } from 'cerialize';

import { VersionedCharacter } from '../versioned-character';
import { MIGRATION } from './migration';

export const DICE = [4, 6, 8, 10, 12, 20] as const;
export type Dice = (typeof DICE)[number];

export const AGE_RANGE = ['child', 'teen', 'adult'] as const;
export type AgeRange = (typeof AGE_RANGE)[number];

export const ABILITY_KEYS = ['fight', 'flight', 'brains', 'brawn', 'charm', 'grit'] as const;
export type AbilityKey = (typeof ABILITY_KEYS)[number];

export class Ability {
	@autoserialize
	die?: Dice;

	@autoserialize
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

@inheritSerialization(VersionedCharacter)
export class KidsOnBikesCharacter extends VersionedCharacter {
	constructor() {
		super('kids-on-bikes', MIGRATION.length);
	}

	@autoserialize
	adversity_tokens = 0;

	@autoserialize
	notes = '';

	@autoserialize
	age = 0;

	@autoserialize
	fear = '';

	@autoserialize
	motivation = '';

	@autoserialize
	flaws = '';

	@autoserialize
	description = '';

	@autoserializeAs(Ability)
	fight = new Ability();

	@autoserializeAs(Ability)
	flight = new Ability();

	@autoserializeAs(Ability)
	brains = new Ability();

	@autoserializeAs(Ability)
	brawn = new Ability();

	@autoserializeAs(Ability)
	charm = new Ability();

	@autoserializeAs(Ability)
	grit = new Ability();
}
