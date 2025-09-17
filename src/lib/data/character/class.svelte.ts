import {
	array,
	boolean,
	ClassSerializer,
	derive,
	enumeration,
	number,
	string,
} from '$lib/serde';
import { mapSum } from '$lib/utils';

import { Character } from './character.svelte';

export const DICE = [4, 6, 8, 10, 12, 20] as const;
export type Dice = (typeof DICE)[number];

export class Class extends ClassSerializer {
	name = string('Unnamed Class', { minLength: 1, maxLength: 100 });

	favored = boolean(false);

	level = number(1, { min: 1 });

	hitDice = enumeration(DICE, 4);

	bab = number(0);

	fort = number(0);

	ref = number(0);

	will = number(0);

	speed = number(0, { min: 0 });

	levelRanks = number(0, { min: 0 });

	miscRanks = number(0);
}

export class Classes extends ClassSerializer {
	list = array(() => new Class(), [new Class()]);

	readonly levels = $derived(mapSum(this.list.value, (c) => c.level.value));

	readonly speed = $derived(mapSum(this.list.value, (c) => c.level.value));

	readonly bab = $derived(mapSum(this.list.value, (c) => c.bab.value));

	readonly fort = $derived(mapSum(this.list.value, (c) => c.fort.value));

	readonly ref = $derived(mapSum(this.list.value, (c) => c.ref.value));

	readonly will = $derived(mapSum(this.list.value, (c) => c.will.value));

	readonly ranks = derive<Character>((c) => {
		const classRanks = mapSum(
			this.list.value,
			(c) => c.levelRanks.value * c.level.value + c.miscRanks.value,
		);
		return classRanks + c.int.mod * c.classes.levels;
	});
}
