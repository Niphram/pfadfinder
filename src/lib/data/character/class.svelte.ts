import { array, boolean, derive, enumeration, number, object, string } from '$lib/serde';
import { mapSum } from '$lib/utils';
import { Character } from './character.svelte';

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
	list = array(() => object(new Class()), [object(new Class())]);

	readonly levels = $derived(mapSum(this.list.value, (c) => c.value.level.value));

	readonly speed = $derived(mapSum(this.list.value, (c) => c.value.level.value));

	readonly bab = $derived(mapSum(this.list.value, (c) => c.value.bab.value));

	readonly fort = $derived(mapSum(this.list.value, (c) => c.value.fort.value));

	readonly ref = $derived(mapSum(this.list.value, (c) => c.value.ref.value));

	readonly will = $derived(mapSum(this.list.value, (c) => c.value.will.value));

	readonly ranks = derive<Character>((c) => {
		const classRanks = mapSum(
			this.list.value,
			(c) => c.value.levelRanks.value * c.value.level.value + c.value.miscRanks.value,
		);
		return classRanks + c.int.mod * c.classes.levels;
	});
}
