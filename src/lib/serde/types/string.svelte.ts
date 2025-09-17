import { Err, Ok, type Result } from '$lib/utils';

import { DESERIALIZE_SYMBOL, SERIALIZE_SYMBOL, type Serializable } from '../interfaces';

export class StringWrapper<Values extends string> implements Serializable {
	value: Values;

	constructor(
		value: Values,
		public readonly options: StringOptions,
	) {
		this.value = $state(value);
	}

	clone() {
		return new StringWrapper(this.value, this.options);
	}

	result(): Result<Values, string> {
		if (this.value.length < this.options.minLength)
			return Err(`Length must be at least ${this.options.minLength}`);

		if (this.value.length > this.options.maxLength)
			return Err(`Length must be at most ${this.options.maxLength}`);

		return Ok(this.value);
	}

	[SERIALIZE_SYMBOL](): unknown {
		return this.value;
	}

	[DESERIALIZE_SYMBOL](value: unknown) {
		if (typeof value === 'string') {
			this.value = value as Values;
		}
	}
}

type StringOptions = Readonly<{
	/**
	 * @default 0
	 */
	minLength: number;

	/**
	 * @default Infinity
	 */
	maxLength: number;
}>;

const DEFAULT_OPTIONS: StringOptions = {
	minLength: 0,
	maxLength: Infinity,
};

export function string(value: string, options?: Partial<StringOptions>): StringWrapper<string>;
export function string<Values extends string>(
	value: Values,
	options?: Partial<StringOptions>,
): StringWrapper<Values>;
export function string<Values extends string>(value: Values, options?: Partial<StringOptions>) {
	return new StringWrapper<Values>(value, Object.assign({}, DEFAULT_OPTIONS, options));
}
