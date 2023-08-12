import { Dice } from './dice';

export type Class = {
	name: string;
	favored: boolean;
	level: number;
	hitDice: Dice;
	bab: number;
	fort: number;
	ref: number;
	will: number;
	speed: number;
	levelRanks: number;
	miscRanks: number;
};

export function makeDefaultClass(): Class {
	return {
		name: 'Unnamed Class',
		favored: false,
		level: 1,
		hitDice: Dice.D4,
		bab: 0,
		fort: 0,
		ref: 0,
		will: 0,
		speed: 0,
		levelRanks: 0,
		miscRanks: 0
	};
}
