import { derived } from 'svelte/store';

import { calculateNode } from '$lib/macro/evaluate';
import { parse, type Node } from '$lib/macro/parser';

import { Character } from './character';
import { idbWritable } from './idb-store';
import { Derive, Macro } from './macros';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const upgrades = new Map<number, (char: any) => void>();

// Spell levels have been renames
upgrades.set(2, (char) => {
	for (let i = 0; i <= 9; i++) {
		char.spells[`level_${i}`] = char.spells[i];
	}
});

export const {
	data: c,
	dirty,
	loaded
} = idbWritable<Character>('character', Character, {
	loadError(err) {
		alert('Character data was corrupted and lost! Sorry!');
		console.log('ERROR WHILE LOADING NEW CHARACTER!');
		console.error(err);
	},
	onUpgrade(data, toVersion) {
		for (let v = data.version; v <= toVersion; v++) {
			upgrades.get(v)?.(data);
			data.version = v;
		}

		return data;
	}
});

export function resetChar() {
	c.set(new Character());
}

const formulaMap = new Map<string, Node>();

export const p = derived(c, (char) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function makeProxy(obj: any) {
		return new Proxy(obj, {
			get(target, p): unknown {
				if (!(p in target)) throw new Error('Something went wrong');

				if (target[p] instanceof Macro || target[p] instanceof Derive) {
					return target[p].eval(char);
				} else if (typeof target[p] === 'object') {
					return makeProxy(target[p]);
				} else if (typeof target[p] === 'string') {
					if (formulaMap.has(target[p])) {
						return calculateNode(formulaMap.get(target[p])!, char);
					} else {
						const node = parse(target[p]);
						formulaMap.set(target[p], node);
						return calculateNode(node, char);
					}
				}
			}
		});
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return makeProxy(char) as any; // TODO
});
