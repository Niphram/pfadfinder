import { GenericDeserializeInto } from 'cerialize';

import { Character } from './character';

/**
 * Upgrade functions will be called before deserializing the stored character.
 * Optionally, the upgrade-function can return a callback,
 * that will be called afterwards with the already deserialized character.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UPGRADES: ((char: any) => void | ((char: Character) => void))[] = [
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
			char.hp.rolled = oldMax - char.con.mod.eval(char) * char.classes.levels;
			char.hp.damageTaken = oldMax - oldCurrent;
		};
	},
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function upgradeCharacterAndDeserialize(char: any) {
	const postUpgrades: ((char: Character) => void)[] = [];

	for (let v = char.version; v <= UPGRADES.length; v++) {
		const postUpgrade = UPGRADES[v - 1](char);

		if (postUpgrade) {
			postUpgrades.push(postUpgrade);
		}

		char.version = v + 1;
	}

	const deserializedChar = GenericDeserializeInto(char, Character, new Character());

	// Apply post-upgrades
	postUpgrades.forEach((postUpgrade) => postUpgrade(deserializedChar));

	return deserializedChar;
}

export const VERSION_NUMBER = UPGRADES.length + 1;
