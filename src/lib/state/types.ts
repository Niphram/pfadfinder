export const abilityKeys = ['str', 'dex', 'con', 'int', 'wis', 'cha'] as const;
export type AbilityKey = (typeof abilityKeys)[number];

export const saveKeys = ['fort', 'ref', 'will'] as const;
export type SaveKey = (typeof saveKeys)[number];

export const sizeKeys = [
	'fine',
	'diminutive',
	'tiny',
	'small',
	'medium',
	'large',
	'huge',
	'gargantuan',
	'colossal'
];
export type SizeKey = (typeof sizeKeys)[number];

export const skillKeys = [
	'acrobatics',
	'appraise',
	'bluff',
	'climb',
	'craft',
	'diplomacy',
	'disableDevice',
	'disguise',
	'escapeArtist',
	'fly',
	'handleAnimal',
	'heal',
	'intimidate',
	'knowledgeArcana',
	'knowledgeDungeoneering',
	'knowledgeEngineering',
	'knowledgeGeography',
	'knowledgeHistory',
	'knowledgeLocal',
	'knowledgeNature',
	'knowledgeNobility',
	'knowledgePlanes',
	'knowledgeReligion',
	'linguistics',
	'perception',
	'perform',
	'profession',
	'ride',
	'senseMotive',
	'sleightOfHand',
	'spellcraft',
	'stealth',
	'survival',
	'swim',
	'useMagicDevice'
] as const;
export type SkillKeys = (typeof skillKeys)[number];
