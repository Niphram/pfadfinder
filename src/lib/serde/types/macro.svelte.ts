import type { RuntimeError } from '$lib/macro/errors';
import { evalNode, evalNodeGen } from '$lib/macro/evaluate';
import { Parser } from '$lib/macro/parser';
import { iteratorResultToResult, type Result } from '$lib/utils';

import { DESERIALIZE_SYMBOL, SERIALIZE_SYMBOL, type Serializable } from '../interfaces';

export class Macro implements Serializable {
	expr = $state('');

	readonly parseResult = $derived(Parser.parse(this.expr));

	/**
	 * Tries to evaluate this macro. Will return NaN when any error occurs.
	 * @param c the character to use when resolving attributes
	 */
	eval(c: object) {
		if (!this.parseResult.ok) {
			return NaN;
		}

		return evalNode(this.parseResult.value, c);
	}

	/**
	 * Tries to evaluate this macro. Will return a result that may or may not be an error
	 * @param c the character to use when resolving attributes
	 */
	evalE(c: object): Result<number, RuntimeError> {
		if (!this.parseResult.ok) {
			return this.parseResult;
		}

		return iteratorResultToResult(evalNodeGen(this.parseResult.value, c).next());
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
