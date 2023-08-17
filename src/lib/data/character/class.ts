import { autoserialize, autoserializeAs, serialize } from 'cerialize';

import { mapSum } from '$lib/utils';
import { Derive } from '../macros';

export enum Dice {
	D4 = 4,
	D6 = 6,
	D8 = 8,
	D10 = 10,
	D12 = 12,
	D20 = 20
}

export class Class {
	@autoserialize
	name = 'Unnamed Class';

	@autoserialize
	favored = false;

	@autoserialize
	level = 1;

	@autoserialize
	hitDice = Dice.D4;

	@autoserialize
	bab = 0;

	@autoserialize
	fort = 0;

	@autoserialize
	ref = 0;

	@autoserialize
	will = 0;

	@autoserialize
	speed = 0;

	@autoserialize
	levelRanks = 0;

	@serialize
	miscRanks = 0;
}

export class Classes {
	@autoserializeAs(Class)
	list = [new Class()];

	get levels() {
		return mapSum(this.list, (c) => c.level);
	}

	get speed() {
		return mapSum(this.list, (c) => c.level);
	}

	get bab(): number {
		return mapSum(this.list, (c) => c.bab);
	}

	get fort(): number {
		return mapSum(this.list, (c) => c.fort);
	}

	get ref(): number {
		return mapSum(this.list, (c) => c.ref);
	}

	get will(): number {
		return mapSum(this.list, (c) => c.will);
	}

	readonly ranks = new Derive((c) => {
		const classRanks = mapSum(this.list, (c) => c.levelRanks * c.level + c.miscRanks);
		return classRanks + c.int.mod.eval(c) * c.classes.levels;
	});
}
