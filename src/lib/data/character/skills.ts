import { autoserialize, autoserializeAs } from 'cerialize';

import { formula } from '../makros';
import type { AbilityKey } from './abilities';

const SKILLS = {
	acrobatics: { ability: 'dex', trained: false },
	appraise: { ability: 'int', trained: false },
	bluff: { ability: 'cha', trained: false },
	climb: { ability: 'str', trained: false },
	craft: { ability: 'int', trained: false },
	diplomacy: { ability: 'cha', trained: false },
	disableDevice: { ability: 'dex', trained: true },
	disguise: { ability: 'cha', trained: false },
	escapeArtist: { ability: 'dex', trained: false },
	fly: { ability: 'dex', trained: false },
	handleAnimal: { ability: 'cha', trained: true },
	heal: { ability: 'wis', trained: false },
	intimidate: { ability: 'cha', trained: false },
	knowledgeArcana: { ability: 'int', trained: true },
	knowledgeDungeoneering: { ability: 'int', trained: true },
	knowledgeEngineering: { ability: 'int', trained: true },
	knowledgeGeography: { ability: 'int', trained: true },
	knowledgeHistory: { ability: 'int', trained: true },
	knowledgeLocal: { ability: 'int', trained: true },
	knowledgeNature: { ability: 'int', trained: true },
	knowledgeNobility: { ability: 'int', trained: true },
	knowledgePlanes: { ability: 'int', trained: true },
	knowledgeReligion: { ability: 'int', trained: true },
	linguistics: { ability: 'int', trained: true },
	perception: { ability: 'wis', trained: false },
	perform: { ability: 'cha', trained: false },
	profession: { ability: 'wis', trained: true },
	ride: { ability: 'dex', trained: false },
	senseMotive: { ability: 'wis', trained: false },
	sleightOfHand: { ability: 'dex', trained: true },
	spellcraft: { ability: 'int', trained: true },
	stealth: { ability: 'dex', trained: false },
	survival: { ability: 'wis', trained: false },
	swim: { ability: 'str', trained: false },
	useMagicDevice: { ability: 'cha', trained: true }
} as const;
export const SKILL_KEYS = Object.keys(SKILLS);
export type SkillKey = keyof typeof SKILLS;

export class Skill {
	@autoserialize
	name = '';

	@autoserialize
	ability: AbilityKey = 'str';

	@autoserialize
	acPenalty = true;

	@autoserialize
	ranks = 0;

	@autoserialize
	misc = formula('0');

	@autoserialize
	temp = formula('0');

	@autoserialize
	classSkill = false;

	@autoserialize
	notes = '';

	get mod() {
		return formula(
			`@${this.ability}.mod+${this.ranks}+(${this.misc})+(${this.temp})+${
				this.classSkill && this.ranks > 0 ? 3 : 0
			}`
		);
	}

	constructor(key?: SkillKey) {
		if (key) {
			this.ability = SKILLS[key].ability;
		}
	}
}

export class SkillGroup {
	@autoserializeAs(Skill)
	skills: Skill[];

	readonly trained: boolean;

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
