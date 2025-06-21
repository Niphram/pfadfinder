import { autoserialize, autoserializeAs } from 'cerialize';

import { mapSum } from '$lib/utils';
import { Derive, Macro, macro } from '../macros';
import type { AbilityKey } from './abilities';

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
	@autoserialize
	name = '';

	@autoserialize
	ability: AbilityKey = 'str';

	@autoserialize
	penalty = false;

	@autoserialize
	ranks = 0;

	@macro
	misc = new Macro('0');

	@macro
	temp = new Macro('0');

	@autoserialize
	classSkill = false;

	@autoserialize
	notes = '';

	readonly mod = new Derive(
		(c) =>
			c[this.ability].skillCheckMod.eval(c) +
			this.ranks +
			this.misc.eval(c) +
			this.temp.eval(c) +
			(this.classSkill && this.ranks > 0 ? 3 : 0),
	);

	constructor(key?: SkillKey) {
		if (key) {
			this.ability = SKILLS[key].ability;
			this.penalty = SKILLS[key].penalty;
		}
	}
}

export class SkillGroup {
	@autoserializeAs(Skill)
	skills: Skill[];

	readonly trained: boolean;

	get ranks() {
		return mapSum(this.skills, (skill) => skill.ranks);
	}

	constructor(key: SkillKey) {
		this.skills = [new Skill(key)];
		this.trained = SKILLS[key].trained;
	}
}

export class SkillList {
	@autoserializeAs(SkillGroup)
	acrobatics = new SkillGroup('acrobatics');

	@autoserializeAs(SkillGroup)
	appraise = new SkillGroup('appraise');

	@autoserializeAs(SkillGroup)
	bluff = new SkillGroup('bluff');

	@autoserializeAs(SkillGroup)
	climb = new SkillGroup('climb');

	@autoserializeAs(SkillGroup)
	craft = new SkillGroup('craft');

	@autoserializeAs(SkillGroup)
	diplomacy = new SkillGroup('diplomacy');

	@autoserializeAs(SkillGroup)
	disableDevice = new SkillGroup('disableDevice');

	@autoserializeAs(SkillGroup)
	disguise = new SkillGroup('disguise');

	@autoserializeAs(SkillGroup)
	escapeArtist = new SkillGroup('escapeArtist');

	@autoserializeAs(SkillGroup)
	fly = new SkillGroup('fly');

	@autoserializeAs(SkillGroup)
	handleAnimal = new SkillGroup('handleAnimal');

	@autoserializeAs(SkillGroup)
	heal = new SkillGroup('heal');

	@autoserializeAs(SkillGroup)
	intimidate = new SkillGroup('intimidate');

	@autoserializeAs(SkillGroup)
	knowledgeArcana = new SkillGroup('knowledgeArcana');

	@autoserializeAs(SkillGroup)
	knowledgeDungeoneering = new SkillGroup('knowledgeDungeoneering');

	@autoserializeAs(SkillGroup)
	knowledgeEngineering = new SkillGroup('knowledgeEngineering');

	@autoserializeAs(SkillGroup)
	knowledgeGeography = new SkillGroup('knowledgeGeography');

	@autoserializeAs(SkillGroup)
	knowledgeHistory = new SkillGroup('knowledgeHistory');

	@autoserializeAs(SkillGroup)
	knowledgeLocal = new SkillGroup('knowledgeLocal');

	@autoserializeAs(SkillGroup)
	knowledgeNature = new SkillGroup('knowledgeNature');

	@autoserializeAs(SkillGroup)
	knowledgeNobility = new SkillGroup('knowledgeNobility');

	@autoserializeAs(SkillGroup)
	knowledgePlanes = new SkillGroup('knowledgePlanes');

	@autoserializeAs(SkillGroup)
	knowledgeReligion = new SkillGroup('knowledgeReligion');

	@autoserializeAs(SkillGroup)
	linguistics = new SkillGroup('linguistics');

	@autoserializeAs(SkillGroup)
	perception = new SkillGroup('perception');

	@autoserializeAs(SkillGroup)
	perform = new SkillGroup('perform');

	@autoserializeAs(SkillGroup)
	profession = new SkillGroup('profession');

	@autoserializeAs(SkillGroup)
	ride = new SkillGroup('ride');

	@autoserializeAs(SkillGroup)
	senseMotive = new SkillGroup('senseMotive');

	@autoserializeAs(SkillGroup)
	sleightOfHand = new SkillGroup('sleightOfHand');

	@autoserializeAs(SkillGroup)
	spellcraft = new SkillGroup('spellcraft');

	@autoserializeAs(SkillGroup)
	stealth = new SkillGroup('stealth');

	@autoserializeAs(SkillGroup)
	survival = new SkillGroup('survival');

	@autoserializeAs(SkillGroup)
	swim = new SkillGroup('swim');

	@autoserializeAs(SkillGroup)
	useMagicDevice = new SkillGroup('useMagicDevice');
}
