import type { Character } from '$lib/data';
import { evalNode } from '$lib/macro/evaluate';
import { Parser } from '$lib/macro/parser';
import { DESERIALIZE_SYMBOL, SERIALIZE_SYMBOL, type Serializable } from '../interfaces';
import type { SerdeProxy } from '../proxy';

export class Macro<C extends object = Character> implements Serializable<Macro<C>> {
	expr = $state('');

	readonly node = $derived(Parser.parse(this.expr));

	eval(c: C) {
		return evalNode(this.node, c);
	}

	constructor(expr: string) {
		this.expr = expr;
	}

	[SERIALIZE_SYMBOL](): unknown {
		return this.expr;
	}

	[DESERIALIZE_SYMBOL](value: unknown): Macro<C> {
		if (typeof value === 'string') {
			this.expr = value;
		}

		return this;
	}
}

export function macro<C extends object = Character>(expr: string) {
	return new Macro<SerdeProxy<C>>(expr);
}
