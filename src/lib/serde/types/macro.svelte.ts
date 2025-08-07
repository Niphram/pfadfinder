import { evalNode } from '$lib/macro/evaluate';
import { Parser } from '$lib/macro/parser';
import { DESERIALIZE_SYMBOL, SERIALIZE_SYMBOL, type Serializable } from '../interfaces';

export class Macro implements Serializable {
	expr = $state('');

	readonly node = $derived(Parser.parse(this.expr));

	eval(c: object) {
		return evalNode(this.node, c);
	}

	constructor(expr: string) {
		this.expr = expr;
	}

	[SERIALIZE_SYMBOL](): unknown {
		return this.expr;
	}

	[DESERIALIZE_SYMBOL](value: unknown) {
		if (typeof value === 'string') {
			this.expr = value;
		}
	}
}

export function macro(expr: string) {
	return new Macro(expr);
}
