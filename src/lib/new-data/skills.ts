import { autoserialize, autoserializeAs } from 'cerialize';
import type { AbilityKey } from './keys';
import type { SkillKey } from '$lib/data';

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
	useMagicDevice: { ability: 'cha', trained: true, penalty: false }
} satisfies Record<SkillKey, { ability: AbilityKey; trained: boolean; penalty: boolean }>;

export class Skill {
	@autoserialize
	name = '';

	@autoserialize
	ability: AbilityKey;

	@autoserialize
	penalty: boolean;

	@autoserialize
	ranks = 0;

	@autoserialize
	classSkill = false;

	@autoserialize
	notes = '';

	// Can this skill be used untrained
	readonly trained: boolean;

	constructor(key: SkillKey) {
		this.ability = SKILLS[key].ability;
		this.penalty = SKILLS[key].penalty;
		this.trained = SKILLS[key].trained;
	}
}

export class SkillList {
	@autoserializeAs(Skill)
	acrobatics = [new Skill('acrobatics')];

	@autoserializeAs(Skill)
	appraise = [new Skill('appraise')];

	@autoserializeAs(Skill)
	bluff = [new Skill('bluff')];

	@autoserializeAs(Skill)
	climb = [new Skill('climb')];

	@autoserializeAs(Skill)
	craft = [new Skill('craft')];

	@autoserializeAs(Skill)
	diplomacy = [new Skill('diplomacy')];

	@autoserializeAs(Skill)
	disableDevice = [new Skill('disableDevice')];

	@autoserializeAs(Skill)
	disguise = [new Skill('disguise')];

	@autoserializeAs(Skill)
	escapeArtist = [new Skill('escapeArtist')];

	@autoserializeAs(Skill)
	fly = [new Skill('fly')];

	@autoserializeAs(Skill)
	handleAnimal = [new Skill('handleAnimal')];

	@autoserializeAs(Skill)
	heal = [new Skill('heal')];

	@autoserializeAs(Skill)
	intimidate = [new Skill('intimidate')];

	@autoserializeAs(Skill)
	knowledgeArcana = [new Skill('knowledgeArcana')];

	@autoserializeAs(Skill)
	knowledgeDungeoneering = [new Skill('knowledgeDungeoneering')];

	@autoserializeAs(Skill)
	knowledgeEngineering = [new Skill('knowledgeEngineering')];

	@autoserializeAs(Skill)
	knowledgeGeography = [new Skill('knowledgeGeography')];

	@autoserializeAs(Skill)
	knowledgeHistory = [new Skill('knowledgeHistory')];

	@autoserializeAs(Skill)
	knowledgeLocal = [new Skill('knowledgeLocal')];

	@autoserializeAs(Skill)
	knowledgeNature = [new Skill('knowledgeNature')];

	@autoserializeAs(Skill)
	knowledgeNobility = [new Skill('knowledgeNobility')];

	@autoserializeAs(Skill)
	knowledgePlanes = [new Skill('knowledgePlanes')];

	@autoserializeAs(Skill)
	knowledgeReligion = [new Skill('knowledgeReligion')];

	@autoserializeAs(Skill)
	linguistics = [new Skill('linguistics')];

	@autoserializeAs(Skill)
	perception = [new Skill('perception')];

	@autoserializeAs(Skill)
	perform = [new Skill('perform')];

	@autoserializeAs(Skill)
	profession = [new Skill('profession')];

	@autoserializeAs(Skill)
	ride = [new Skill('ride')];

	@autoserializeAs(Skill)
	senseMotive = [new Skill('senseMotive')];

	@autoserializeAs(Skill)
	sleightOfHand = [new Skill('sleightOfHand')];

	@autoserializeAs(Skill)
	spellcraft = [new Skill('spellcraft')];

	@autoserializeAs(Skill)
	stealth = [new Skill('stealth')];

	@autoserializeAs(Skill)
	survival = [new Skill('survival')];

	@autoserializeAs(Skill)
	swim = [new Skill('swim')];

	@autoserializeAs(Skill)
	useMagicDevice = [new Skill('useMagicDevice')];
}
