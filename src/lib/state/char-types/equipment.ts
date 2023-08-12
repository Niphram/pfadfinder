export const armorTypes = ['light', 'medium', 'heavy', 'shield', 'misc'] as const;
export type ArmorType = (typeof armorTypes)[number];

export type AcItem = {
	name: string;
	equipped: boolean;
	acBonus: number;
	ffBonus: number;
	touchBonus: number;
	natBonus: number;
	defBonus: number;
	dodBonus: number;
	type: ArmorType;
	chkPenalty: number;
	maxDexBonus: number;
	spellFailure: number;
	notes: string;
};

export function makeDefaultAcItem(): AcItem {
	return {
		name: 'Unnamed Item',
		equipped: true,
		acBonus: 0,
		ffBonus: 0,
		touchBonus: 0,
		natBonus: 0,
		defBonus: 0,
		dodBonus: 0,
		type: 'medium',
		chkPenalty: 0,
		maxDexBonus: 0,
		spellFailure: 0,
		notes: ''
	};
}
