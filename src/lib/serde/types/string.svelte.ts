import { DESERIALIZE_SYMBOL, SERIALIZE_SYMBOL, type Serializable } from '../interfaces';
import type { Option } from '../optional';

export class StringWrapper<Values extends string, IsOptional extends boolean>
	implements Serializable<StringWrapper<Values, IsOptional>>
{
	value: Option<Values, IsOptional>;

	constructor(
		value: Option<Values, IsOptional>,
		private readonly options: StringOptions<IsOptional>,
	) {
		this.value = $state(value);
	}

	[SERIALIZE_SYMBOL](): unknown {
		return this.value;
	}

	[DESERIALIZE_SYMBOL](value: unknown): StringWrapper<Values, IsOptional> {
		if (typeof value === 'string') {
			this.value = value as Option<Values, IsOptional>;
		}

		return this;
	}
}

type StringOptions<IsOptional extends boolean> = Partial<{
	optional: IsOptional;
	minLength?: number;
	maxLength?: number;
}>;

const DEFAULT_OPTIONS: StringOptions<boolean> = {
	optional: false,
	minLength: 0,
	maxLength: Infinity,
};

export function string<IsOptional extends boolean = false>(
	value: Option<string, IsOptional>,
	options?: StringOptions<IsOptional>,
): StringWrapper<string, IsOptional>;
export function string<Values extends string, IsOptional extends boolean = false>(
	value: Option<Values, IsOptional>,
	options?: StringOptions<IsOptional>,
): StringWrapper<Values, IsOptional>;
export function string<Values extends string, IsOptional extends boolean = false>(
	value: Option<Values, IsOptional>,
	options?: StringOptions<IsOptional>,
) {
	return new StringWrapper<Values, IsOptional>(value, Object.assign({}, DEFAULT_OPTIONS, options));
}
