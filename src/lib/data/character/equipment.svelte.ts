import { nanoid } from 'nanoid';

import { array, boolean, number, object, string } from '$lib/serde';
import { mapMin, mapSum } from '$lib/utils';
import type { SerdeProxy } from '$lib/serde/proxy';

export const ARMOR_TYPES = ['light', 'medium', 'heavy', 'shield', 'misc'] as const;
export type ArmorType = (typeof ARMOR_TYPES)[number];

export const CHARGE_TYPES = ['none', 'perDay', 'total'] as const;
export type ChargeType = (typeof CHARGE_TYPES)[number];

export class Item {
	id = nanoid();

	name = string('Unnamed Item');

	quantity = number(1, { integer: true, min: 0 });

	equipped = boolean(true);

	weight = number(0, { min: 0 });

	chargeType = string<ChargeType>('none');

	remaining = number(0, { integer: true, min: 0 });

	perDay = number(1, { integer: true, min: 0 });

	description = string('', { maxLength: 2000 });

	isContainer = boolean(false);

	containerOpen = boolean(false);

	children = array(() => object(new Item()), []);

	readonly totalWeight: number = $derived(
		this.quantity.value * this.weight.value +
			(this.isContainer.value ? mapSum(this.children.value, (item) => item.value.totalWeight) : 0),
	);

	recharge(this: SerdeProxy<Item>) {
		if (this.chargeType === 'perDay') {
			this.remaining = this.perDay;
		}
	}
}

export class AcItem {
	id = nanoid();

	name = string('Unnamed Item');

	equipped = boolean(false);

	acBonus = number(0);

	ffBonus = number(0);

	touchBonus = number(0);

	natBonus = number(0);

	defBonus = number(0);

	dodBonus = number(0);

	type = string<ArmorType>('medium');

	chkPenalty = number(0);

	maxDexBonus = number(undefined, { optional: true });

	spellFailure = number(0);

	notes = string('', { maxLength: 1000 });
}

export class Equipment {
	items = array(() => object(new Item()), []);

	acItems = array(() => object(new AcItem()), []);

	readonly acBonus = $derived(
		mapSum(this.acItems.value, (i) => (i.value.equipped.value ? i.value.acBonus.value : 0)),
	);

	readonly maxDexBonus = $derived(
		mapMin(this.acItems.value, (i) => i.value.maxDexBonus.value ?? Infinity) ?? Infinity,
	);

	readonly armorCheckPenalty = $derived(
		mapSum(this.acItems.value, (i) => i.value.chkPenalty.value),
	);

	readonly totalWeight = $derived(
		mapSum(this.items.value, (i) =>
			!i.value.isContainer.value || i.value.equipped.value ? i.value.totalWeight : 0,
		),
	);
}
