import { array, boolean, derive, enumeration, macro, number, object, string } from '$lib/serde';
import { mapSum } from '$lib/utils';

import type { AbilityKey } from './abilities.svelte';
import { Character } from './character';

const SKILLS = {
	acrobatics: { ability: 'dex', trained: false, penalty: true },
	appraise: { ability: 'int', trained: false, penalty: false },
	bluff: { ability: 'cha', trained: false, penalty: false },
	climb: { ability: 'str', trained: false, penalty: false },
	craft: { ability: 'int', trained: false, penalty: false },
	diplomacy: { ability: 'cha', trained: false, penalty: false },
	disableDevice: { ability: 'dex', trained: true, penalty: true },
	disguise: { ability: 'cha', trained: false, penalty: false },
	escapeArtist: { ability: 'dex', trained: false, penalty: true },
	fly: { ability: 'dex', trained: false, penalty: true },
	handleAnimal: { ability: 'cha', trained: true, penalty: false },
	heal: { ability: 'wis', trained: false, penalty: false },
	intimidate: { ability: 'cha', trained: false, penalty: false },
	knowledgeArcana: { ability: 'int', trained: true, penalty: false },
	knowledgeDungeoneering: { ability: 'int', trained: true, penalty: false },
	knowledgeEngineering: { ability: 'int', trained: true, penalty: false },
	knowledgeGeography: { ability: 'int', trained: true, penalty: false },
	knowledgeHistory: { ability: 'int', trained: true, penalty: false },
	knowledgeLocal: { ability: 'int', trained: true, penalty: false },
	knowledgeNature: { ability: 'int', trained: true, penalty: false },
	knowledgeNobility: { ability: 'int', trained: true, penalty: false },
	knowledgePlanes: { ability: 'int', trained: true, penalty: false },
	knowledgeReligion: { ability: 'int', trained: true, penalty: false },
	linguistics: { ability: 'int', trained: true, penalty: false },
	perception: { ability: 'wis', trained: false, penalty: false },
	perform: { ability: 'cha', trained: false, penalty: false },
	profession: { ability: 'wis', trained: true, penalty: false },
	ride: { ability: 'dex', trained: false, penalty: true },
	senseMotive: { ability: 'wis', trained: false, penalty: false },
	sleightOfHand: { ability: 'dex', trained: true, penalty: true },
	spellcraft: { ability: 'int', trained: true, penalty: false },
	stealth: { ability: 'dex', trained: false, penalty: true },
	survival: { ability: 'wis', trained: false, penalty: false },
	swim: { ability: 'str', trained: false, penalty: false },
	useMagicDevice: { ability: 'cha', trained: true, penalty: false },
} as const;
export const SKILL_KEYS = Object.keys(SKILLS);
export type SkillKey = keyof typeof SKILLS;

export class Skill {
	name = string('');

	ability = enumeration<AbilityKey>('str');

	penalty = boolean(false);

	ranks = number(0);

	misc = macro('0');

	temp = macro('0');

	classSkill = boolean(false);

	notes = string('');

	readonly mod = derive<Character>(
		(c) =>
			c[this.ability.value].skillCheckMod +
			this.ranks.value +
			this.misc.eval(c) +
			this.temp.eval(c) +
			(this.classSkill.value && this.ranks.value > 0 ? 3 : 0),
	);

	constructor(key?: SkillKey) {
		if (key) {
			this.ability.value = SKILLS[key].ability;
			this.penalty.value = SKILLS[key].penalty;
		}
	}
}

export class SkillGroup {
	skills = array(() => object(new Skill()), []);

	readonly trained: boolean;

	get ranks() {
		return mapSum(this.skills.value, (skill) => skill.value.ranks.value);
	}

	constructor(key: SkillKey) {
		this.skills.value = [object(new Skill(key))];
		this.trained = SKILLS[key].trained;
	}
}

export class SkillList {
	acrobatics = object(new SkillGroup('acrobatics'));

	appraise = object(new SkillGroup('appraise'));

	bluff = object(new SkillGroup('bluff'));

	climb = object(new SkillGroup('climb'));

	craft = object(new SkillGroup('craft'));

	diplomacy = object(new SkillGroup('diplomacy'));

	disableDevice = object(new SkillGroup('disableDevice'));

	disguise = object(new SkillGroup('disguise'));

	escapeArtist = object(new SkillGroup('escapeArtist'));

	fly = object(new SkillGroup('fly'));

	handleAnimal = object(new SkillGroup('handleAnimal'));

	heal = object(new SkillGroup('heal'));

	intimidate = object(new SkillGroup('intimidate'));

	knowledgeArcana = object(new SkillGroup('knowledgeArcana'));

	knowledgeDungeoneering = object(new SkillGroup('knowledgeDungeoneering'));

	knowledgeEngineering = object(new SkillGroup('knowledgeEngineering'));

	knowledgeGeography = object(new SkillGroup('knowledgeGeography'));

	knowledgeHistory = object(new SkillGroup('knowledgeHistory'));

	knowledgeLocal = object(new SkillGroup('knowledgeLocal'));

	knowledgeNature = object(new SkillGroup('knowledgeNature'));

	knowledgeNobility = object(new SkillGroup('knowledgeNobility'));

	knowledgePlanes = object(new SkillGroup('knowledgePlanes'));

	knowledgeReligion = object(new SkillGroup('knowledgeReligion'));

	linguistics = object(new SkillGroup('linguistics'));

	perception = object(new SkillGroup('perception'));

	perform = object(new SkillGroup('perform'));

	profession = object(new SkillGroup('profession'));

	ride = object(new SkillGroup('ride'));

	senseMotive = object(new SkillGroup('senseMotive'));

	sleightOfHand = object(new SkillGroup('sleightOfHand'));

	spellcraft = object(new SkillGroup('spellcraft'));

	stealth = object(new SkillGroup('stealth'));

	survival = object(new SkillGroup('survival'));

	swim = object(new SkillGroup('swim'));

	useMagicDevice = object(new SkillGroup('useMagicDevice'));
}
