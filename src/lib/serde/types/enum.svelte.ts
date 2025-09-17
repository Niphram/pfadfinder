import { Err, Ok, type Result } from '$lib/utils';

import { DESERIALIZE_SYMBOL, SERIALIZE_SYMBOL, type Serializable } from '../interfaces';
import type { Option } from '../optional';

export class EnumWrapper<Values extends readonly (string | number)[], IsOptional extends boolean>
	implements Serializable
{
	value: Option<Values[number], IsOptional>;

	constructor(
		public readonly values: Values,
		value: Option<Values[number], IsOptional>,
		public readonly options: EnumerationOptions<IsOptional>,
	) {
		this.value = $state(value);
	}

	clone() {
		return new EnumWrapper(this.values, this.value, this.options);
	}

	result(): Result<Option<Values[number], IsOptional>, string> {
		if (this.value !== null) {
			if (!this.values.includes(this.value)) return Err('Value is invalid');
		} else if (!this.options.optional) {
			return Err('Value is required');
		}

		return Ok(this.value);
	}

	[SERIALIZE_SYMBOL](): unknown {
		return this.value;
	}

	[DESERIALIZE_SYMBOL](value: unknown) {
		if (value === null && this.options.optional) {
			this.value = null as Option<Values[number], IsOptional>;
		} else if (value !== null && this.values.includes(value as Values[number])) {
			this.value = value as Option<Values[number], IsOptional>;
		}
	}
}

type EnumerationOptions<IsOptional extends boolean> = Readonly<{
	optional: IsOptional;
}>;

const DEFAULT_OPTIONS: EnumerationOptions<boolean> = {
	optional: false,
};

export function enumeration<
	Values extends readonly (string | number)[],
	IsOptional extends boolean = false,
>(
	values: Values,
	value: Option<Values[number], IsOptional>,
	options?: Partial<EnumerationOptions<IsOptional>>,
) {
	return new EnumWrapper(values, value, Object.assign({}, DEFAULT_OPTIONS, options));
}
