import { Err, Ok, type Result } from '$lib/utils';

import { DESERIALIZE_SYMBOL, SERIALIZE_SYMBOL, type Serializable } from '../interfaces';
import type { Option } from '../optional';

export class NumberWrapper<IsOptional extends boolean> implements Serializable {
	value: Option<number, IsOptional>;

	constructor(
		value: Option<number, IsOptional>,
		public readonly options: NumberOptions<IsOptional>,
	) {
		this.value = $state(value);
	}

	clone() {
		return new NumberWrapper(this.value, this.options);
	}

	result(): Result<Option<number, IsOptional>, string> {
		if (this.value !== undefined && this.value !== null) {
			// Could this even happen?
			if (typeof this.value !== 'number') {
				return Err('Not a number');
			}

			if (this.value < this.options.min) return Err(`Must be at least ${this.options.min}`);
			if (this.value > this.options.max) return Err(`Must be at most ${this.options.max}`);

			if (this.options.integer && !Number.isInteger(this.value)) return Err('Must be an integer');
		} else if (!this.options.optional) {
			// input value will be null if it is invalid, so we can't differentiate between empty and invalid input
			return Err('Value is not valid');
		}

		return Ok(this.value);
	}

	[SERIALIZE_SYMBOL](): unknown {
		return this.value;
	}

	[DESERIALIZE_SYMBOL](value: unknown) {
		if (typeof value === 'number') {
			this.value = value;
		}
	}
}

type NumberOptions<IsOptional extends boolean> = Readonly<{
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

const DEFAULT_OPTIONS: NumberOptions<boolean> = {
	optional: false,
	min: -Infinity,
	max: Infinity,
	integer: true,
};

export function number<IsOptional extends boolean = false>(
	value: Option<number, IsOptional>,
	options?: Partial<NumberOptions<IsOptional>>,
) {
	return new NumberWrapper<IsOptional>(value, Object.assign({}, DEFAULT_OPTIONS, options));
}
