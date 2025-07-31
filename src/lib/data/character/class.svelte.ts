import { array, boolean, enumeration, number, string } from '$lib/serde';
import { mapSum } from '$lib/utils';

import { Derive } from '../macros';

export enum Dice {
	D4 = 4,
	D6 = 6,
	D8 = 8,
	D10 = 10,
	D12 = 12,
	D20 = 20,
}

export class Class {
	name = string('Unnamed Class', { maxLength: 50 });

	favored = boolean(false);

	level = number(1);

	hitDice = enumeration(Dice.D4);

	bab = number(0);

	fort = number(0);

	ref = number(0);

	will = number(0);

	speed = number(0);

	levelRanks = number(0);

	miscRanks = number(0);
}

export class Classes {
	list = array(() => new Class(), [new Class()]);

	readonly levels = $derived(mapSum(this.list.value, (c) => c.level.value));

	readonly speed = $derived(mapSum(this.list.value, (c) => c.level.value));

	readonly bab = $derived(mapSum(this.list.value, (c) => c.bab.value));

	readonly fort = $derived(mapSum(this.list.value, (c) => c.fort.value));

	readonly ref = $derived(mapSum(this.list.value, (c) => c.ref.value));

	readonly will = $derived(mapSum(this.list.value, (c) => c.will.value));

	readonly ranks = new Derive((c) => {
		const classRanks = mapSum(
			this.list.value,
			(c) => c.levelRanks.value * c.level.value + c.miscRanks.value,
		);
		return classRanks + c.int.mod.eval(c) * c.classes.levels;
	});
}
