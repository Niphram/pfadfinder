import { charProxy, DESERIALIZE_SYMBOL, type SerdeProxy } from '$lib/serde';

import { BaseSystem } from '../system';
import { Character } from './character';
import { UPGRADES } from './migrations';

export class PathfinderSystem extends BaseSystem<Character> {
	key = 'pathfinder';

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	upgradeCharacterAndDeserialize(char: any): Character {
		const postUpgrades: ((char: SerdeProxy<Character>) => void)[] = [];

		for (let v = char.version; v <= UPGRADES.length; v++) {
			const postUpgrade = UPGRADES[v - 1](char);

			if (postUpgrade) {
				postUpgrades.push(postUpgrade);
			}

			char.version = v + 1;
		}

		const deserializedChar = new Character();
		deserializedChar[DESERIALIZE_SYMBOL](char);

		const proxy = charProxy(deserializedChar);

		// Apply post-upgrades
		postUpgrades.forEach((postUpgrade) => postUpgrade(proxy));

		return deserializedChar;
	}
}
