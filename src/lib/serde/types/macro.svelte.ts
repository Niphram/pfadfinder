import type { RuntimeError } from '$lib/macro/errors';
import { evalNodeGen } from '$lib/macro/evaluate';
import { Parser } from '$lib/macro/parser';
import { Err, iteratorResultToResult, Ok, type Result } from '$lib/utils';

import {
	DESERIALIZE_SYMBOL,
	SERIALIZE_SYMBOL,
	type Serializable,
} from '../interfaces';
import type { Option } from '../optional';

function validationError<T>(message: string): Result<T, RuntimeError> {
	return Err({
		message,
		from: 0,
		to: 0,
	});
}

export class Macro<IsOptional extends boolean> implements Serializable {
	expr = $state('');

	readonly parseResult = $derived(Parser.parse(this.expr));

	/**
	 * Tries to evaluate this macro. Will return NaN when any error occurs (even validation errors)
	 * @param c the character to use when resolving attributes
	 */
	eval(c: object): Option<number, IsOptional> {
		const result = this.result(c);

		if (!result.ok) return NaN;
		else return result.value;
	}

	result(c: object): Result<Option<number, IsOptional>, RuntimeError> {
		// If the expression is empty and this macro is optional
		if (!this.expr.trim() && this.options.optional) {
			return Ok(null) as Result<Option<number, IsOptional>, RuntimeError>;
		}

		// Could not parse the expression
		if (!this.parseResult.ok) {
			return this.parseResult;
		}

		const result = iteratorResultToResult(
			evalNodeGen(this.parseResult.value, c).next(),
		);

		// Validate the result
		if (result.ok) {
			// Integer validation
			if (this.options.integer && !Number.isInteger(result.value)) {
				return validationError(`Value must be an integer (is ${result.value})`);
			}

			// Minimum validation
			if (result.value < this.options.min) {
				return validationError(
					`Value must not be lower than ${this.options.min} (is ${result.value})`,
				);
			}

			// Maximum validation
			if (result.value > this.options.max) {
				return validationError(
					`Value must not be greater than ${this.options.max} (is ${result.value})`,
				);
			}
		}

		return result;
	}

	constructor(
		expr: string,
		public readonly options: MacroOptions<IsOptional>,
	) {
		this.expr = expr;
	}

	clone() {
		return new Macro(this.expr, this.options);
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

type MacroOptions<IsOptional extends boolean> = Readonly<{
	/**
	 * @default false
	 */
	optional: IsOptional;

	/**
	 * @default -Infinity
	 */
	min: number;

	/**
	 * @default Infinity
	 */
	max: number;

	/**
	 * @default true
	 */
	integer: boolean;
}>;

const DEFAULT_OPTIONS: MacroOptions<boolean> = {
	optional: false,
	integer: true,
	min: -Infinity,
	max: Infinity,
};

export function macro<IsOptional extends boolean = false>(
	expr: string,
	options?: Partial<MacroOptions<IsOptional>>,
) {
	const mergedOptions = Object.assign({}, DEFAULT_OPTIONS, options);
	return new Macro(expr, mergedOptions);
}
