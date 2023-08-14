import { derived } from 'svelte/store';

import { calculateNode } from '$lib/macro/evaluate';
import { parse } from '$lib/macro/parser';

import { Character } from './character';
import { idbWritable } from './idb-store';

export const {
	data: c,
	dirty,
	loaded
} = idbWritable('character', Character, {
	loadError(err) {
		console.log('ERROR WHILE LOADING NEW CHARACTER!');
		console.error(err);
	}
});

export function resetChar() {
	c.set(new Character());
}

export const p = derived(c, (char) => {
	function makeProxy(obj: any) {
		return new Proxy(obj, {
			get(target, p, receiver): unknown {
				if (!(p in target)) throw new Error('Something went wrong');

				if (typeof target[p] === 'object') {
					return makeProxy(target[p]);
				} else if (typeof target[p] === 'string') {
					return calculateNode(parse(target[p]), char);
				}
			}
		});
	}

	return makeProxy(char) as any; // TODO
});
