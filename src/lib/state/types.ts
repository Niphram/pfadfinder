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
