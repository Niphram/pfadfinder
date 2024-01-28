import { autoserialize, autoserializeAs } from 'cerialize';
import { nanoid } from 'nanoid';

import { mapSum } from '$lib/utils';

export const ARMOR_TYPES = ['light', 'medium', 'heavy', 'shield', 'misc'] as const;
export type ArmorType = (typeof ARMOR_TYPES)[number];

export const CHARGE_TYPES = ['none', 'perDay', 'total'] as const;
export type ChargeType = (typeof CHARGE_TYPES)[number];

export class Item {
	id = nanoid();

	@autoserialize
	name = 'Unnamed Item';

	@autoserialize
	quantity = 1;

	@autoserialize
	equipped = false;

	@autoserialize
	weight = 0;

	@autoserialize
	chargeType: ChargeType = 'none';

	@autoserialize
	remaining = 0;

	@autoserialize
	perDay = 1;

	@autoserialize
	description = '';

	get totalWeight() {
		return this.quantity * this.weight;
	}

	recharge() {
		if (this.chargeType === 'perDay') {
			this.remaining = this.perDay;
		}
	}
}

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
	@autoserializeAs(Item)
	items: Item[] = [];

	@autoserializeAs(AcItem)
	acItems: AcItem[] = [];

	get acBonus() {
		return mapSum(this.acItems, (i) => (i.equipped ? i.acBonus : 0));
	}

	get totalWeight() {
		return mapSum(this.items, (i) => (i.equipped ? i.totalWeight : 0));
	}
}
