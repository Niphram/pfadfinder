import {
	array,
	boolean,
	ClassSerializer,
	derive,
	enumeration,
	macro,
	number,
	string,
} from '$lib/serde';
import { mapSum } from '$lib/utils';

import { ABILITY_KEYS } from './abilities.svelte';
import { Character } from './character.svelte';

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

export class Skill extends ClassSerializer {
	name = string('Unnamed Skill', { minLength: 1, maxLength: 100 });

	ability = enumeration(ABILITY_KEYS, 'str');

	penalty = boolean(false);

	ranks = number(0, { min: 0 });

	misc = macro('0');

	temp = macro('0');

	classSkill = boolean(false);

	notes = string('', { maxLength: 2000 });

	readonly mod = derive<Character>(
		(c) =>
			c[this.ability.value].skillCheckMod +
			this.ranks.value +
			this.misc.eval(c) +
			this.temp.eval(c) +
			(this.classSkill.value && this.ranks.value > 0 ? 3 : 0),
	);

	constructor(key?: SkillKey) {
		super();

		if (key) {
			this.ability.value = SKILLS[key].ability;
			this.penalty.value = SKILLS[key].penalty;
		}
	}
}

export class SkillGroup extends ClassSerializer {
	skills = array(() => new Skill(), []);

	readonly trained: boolean;

	readonly ranks = $derived(mapSum(this.skills.value, (skill) => skill.ranks.value));

	constructor(key: SkillKey) {
		super();

		this.skills.value = [new Skill(key)];
		this.trained = SKILLS[key].trained;
	}
}

export class SkillList extends ClassSerializer {
	readonly acrobatics = new SkillGroup('acrobatics');

	readonly appraise = new SkillGroup('appraise');

	readonly bluff = new SkillGroup('bluff');

	readonly climb = new SkillGroup('climb');

	readonly craft = new SkillGroup('craft');

	readonly diplomacy = new SkillGroup('diplomacy');

	readonly disableDevice = new SkillGroup('disableDevice');

	readonly disguise = new SkillGroup('disguise');

	readonly escapeArtist = new SkillGroup('escapeArtist');

	readonly fly = new SkillGroup('fly');

	readonly handleAnimal = new SkillGroup('handleAnimal');

	readonly heal = new SkillGroup('heal');

	readonly intimidate = new SkillGroup('intimidate');

	readonly knowledgeArcana = new SkillGroup('knowledgeArcana');

	readonly knowledgeDungeoneering = new SkillGroup('knowledgeDungeoneering');

	readonly knowledgeEngineering = new SkillGroup('knowledgeEngineering');

	readonly knowledgeGeography = new SkillGroup('knowledgeGeography');

	readonly knowledgeHistory = new SkillGroup('knowledgeHistory');

	readonly knowledgeLocal = new SkillGroup('knowledgeLocal');

	readonly knowledgeNature = new SkillGroup('knowledgeNature');

	readonly knowledgeNobility = new SkillGroup('knowledgeNobility');

	readonly knowledgePlanes = new SkillGroup('knowledgePlanes');

	readonly knowledgeReligion = new SkillGroup('knowledgeReligion');

	readonly linguistics = new SkillGroup('linguistics');

	readonly perception = new SkillGroup('perception');

	readonly perform = new SkillGroup('perform');

	readonly profession = new SkillGroup('profession');

	readonly ride = new SkillGroup('ride');

	readonly senseMotive = new SkillGroup('senseMotive');

	readonly sleightOfHand = new SkillGroup('sleightOfHand');

	readonly spellcraft = new SkillGroup('spellcraft');

	readonly stealth = new SkillGroup('stealth');

	readonly survival = new SkillGroup('survival');

	readonly swim = new SkillGroup('swim');

	readonly useMagicDevice = new SkillGroup('useMagicDevice');

	readonly skillRanks = $derived(mapSum(SKILL_KEYS, (key) => this[key].ranks));
}
