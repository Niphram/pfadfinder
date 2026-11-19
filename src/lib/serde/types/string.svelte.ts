import { Err, Ok, type Result } from '#lib/utils/result.js';

import {
	DESERIALIZE_SYMBOL,
	SERIALIZE_SYMBOL,
	type Serializable,
} from '../interfaces';
import type { Option } from '../optional';

export class StringWrapper<
	Values extends string,
	IsOptional extends boolean = false,
> implements Serializable {
	value: Option<Values, IsOptional>;

	constructor(
		value: Option<Values, IsOptional>,
		public readonly options: StringOptions<IsOptional>,
	) {
		this.value = $state(value);
	}

	clone() {
		return new StringWrapper(this.value, this.options);
	}

	result(): Result<Option<Values, IsOptional>, string> {
		if (this.value !== null) {
			if (this.value.length < this.options.minLength)
				return Err(`Length must be at least ${this.options.minLength}`);

			if (this.value.length > this.options.maxLength)
				return Err(`Length must be at most ${this.options.maxLength}`);
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
		if (value === null && this.options.optional) {
			this.value = null as Option<Values, IsOptional>;
		} else if (typeof value === 'string') {
			this.value = value as Values;
		}
	}
}

type StringOptions<IsOptional extends boolean> = Readonly<{
	/**
	 * @default false
	 */
	optional: IsOptional;

	/**
	 * @default 0
	 */
	minLength: number;

	/**
	 * @default Infinity
	 */
	maxLength: number;
}>;

const DEFAULT_OPTIONS: StringOptions<boolean> = {
	optional: false,
	minLength: 0,
	maxLength: Infinity,
};

export function string<IsOptional extends boolean = false>(
	value: Option<string, IsOptional>,
	options?: Partial<StringOptions<IsOptional>>,
): StringWrapper<string, IsOptional>;
export function string<
	Values extends string,
	IsOptional extends boolean = false,
>(
	value: Option<Values, IsOptional>,
	options?: Partial<StringOptions<IsOptional>>,
): StringWrapper<Values, IsOptional>;
export function string<
	Values extends string,
	IsOptional extends boolean = false,
>(
	value: Option<Values, IsOptional>,
	options?: Partial<StringOptions<IsOptional>>,
) {
	return new StringWrapper<Values, IsOptional>(
		value,
		Object.assign({}, DEFAULT_OPTIONS, options),
	);
}
