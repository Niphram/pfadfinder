import { autoserialize, autoserializeAs } from 'cerialize';

import { mapSum } from '$lib/utils';

export const ARMOR_TYPES = ['light', 'medium', 'heavy', 'shield', 'misc'] as const;
export type ArmorType = (typeof ARMOR_TYPES)[number];

export class AcItem {
	@autoserialize
	name = 'Unnamed Item';

	@autoserialize
	equipped = false;

	@autoserialize
	acBonus = 0;

	@autoserialize
	ffBonus = 0;

	@autoserialize
	touchBonus = 0;

	@autoserialize
	natBonus = 0;

	@autoserialize
	defBonus = 0;

	@autoserialize
	dodBonus = 0;

	@autoserialize
	type: ArmorType = 'medium';

	@autoserialize
	chkPenalty = 0;

	@autoserialize
	maxDexBonus = 0;

	@autoserialize
	spellFailure = 0;

	@autoserialize
	notes = '';
}

export class Equipment {
	@autoserializeAs(AcItem)
	acItems: AcItem[] = [];

	get acBonus() {
		return mapSum(this.acItems, (i) => (i.equipped ? i.acBonus : 0));
	}
}
