import { autoserialize, autoserializeAs } from 'cerialize';
import { nanoid } from 'nanoid';

import { mapMin, mapSum } from '$lib/utils';

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
	equipped = true;

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

	@autoserialize
	isContainer = false;

	@autoserializeAs(Item)
	children: Item[] = [];

	get totalWeight(): number {
		return (
			this.quantity * this.weight +
			(this.isContainer ? mapSum(this.children, (item) => item.totalWeight) : 0)
		);
	}

	recharge() {
		if (this.chargeType === 'perDay') {
			this.remaining = this.perDay;
		}
	}
}

export class AcItem {
	id = nanoid();

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
	maxDexBonus?: number = undefined;

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

	get maxDexBonus() {
		return mapMin(this.acItems, (i) => i.maxDexBonus ?? Infinity) ?? Infinity;
	}

	get armorCheckPenalty() {
		return mapSum(this.acItems, (i) => i.chkPenalty);
	}

	get totalWeight() {
		return mapSum(this.items, (i) => (!i.isContainer || i.equipped ? i.totalWeight : 0));
	}
}
