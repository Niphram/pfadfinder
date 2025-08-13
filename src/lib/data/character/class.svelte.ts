import { array, boolean, derive, enumeration, number, string } from '$lib/serde';
import { ClassSerializer } from '$lib/serde/class-serializer';
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

export class Class extends ClassSerializer {
	name = string('Unnamed Class', { maxLength: 50 });

	favored = boolean(false);

	level = number(1, { min: 1, integer: true });

	hitDice = enumeration(Dice.D4);

	bab = number(0, { min: 0, integer: true });

	fort = number(0, { integer: true });

	ref = number(0, { integer: true });

	will = number(0, { integer: true });

	speed = number(0, { min: 0, integer: true });

	levelRanks = number(0, { min: 0, integer: true });

	miscRanks = number(0, { integer: true });
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
