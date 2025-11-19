import type { SerdeProxy } from '$lib/serde';

import type { Character } from './character';

export const UPGRADES: ((
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	char: any,
) => void | ((char: SerdeProxy<Character>) => void))[] = [
	// Version 2, rename spell levels
	(char: { spells: Record<`level_${number}` | number, unknown> }) => {
		for (let i = 0; i <= 9; i++) {
			char.spells[`level_${i}`] = char.spells[i];
		}
	},
	// Version 3: switch to new HP system
	(char: {
		hp: {
			max: number;
			current: number;
		};
	}) => {
		const oldMax = char.hp.max;
		const oldCurrent = char.hp.current;

		return (char) => {
			// Calculate new hitpoint data format
			char.hp.rolled = oldMax - char.con.mod * char.classes.levels;
			char.hp.damageTaken = oldMax - oldCurrent;
		};
	},
	// Version 4: Breaking change for attack abilityModifier
	(char: {
		combat: {
			attacks: {
				attack: {
					abilityModifier: string | null;
				};
			}[];
		};
	}) => {
		char.combat.attacks.forEach((attack) => {
			if (attack.attack.abilityModifier === 'none') {
				attack.attack.abilityModifier = null;
			}
		});
	},
];

export const VERSION_NUMBER = UPGRADES.length + 1;
