import { derived } from 'svelte/store';

import { calculateNode } from '$lib/macro/evaluate';
import { parse, type Node } from '$lib/macro/parser';

import { Character } from './character';
import { idbWritable } from './idb-store';
import { Derive, Macro } from './macros';
import { listCharacters, newCharacter, test } from './character-manager';
import { encode } from 'messagepack';
import { Serialize } from 'cerialize';

export const {
	data: c,
	dirty,
	loaded
} = idbWritable('character', Character, {
	loadError(err) {
		alert('Character data was corrupted and lost! Sorry!');
		console.log('ERROR WHILE LOADING NEW CHARACTER!');
		console.error(err);
	}
});

export function resetChar() {
	c.set(new Character());
}

const formulaMap = new Map<string, Node>();

export const p = derived(c, (char) => {
	function makeProxy(obj: any) {
		return new Proxy(obj, {
			get(target, p, _receiver): unknown {
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

	return makeProxy(char) as any; // TODO
});

export function encodeCharacter(char: Character) {
	return Serialize(char);
	
}