import { DESERIALIZE_SYMBOL, SERIALIZE_SYMBOL, type Serializable } from '../interfaces';
import type { Option } from '../optional';

export class EnumWrapper<Values, IsOptional extends boolean> implements Serializable {
	value: Option<Values, IsOptional>;

	constructor(
		value: Option<Values, IsOptional>,
		private readonly options: EnumerationOptions<IsOptional>,
	) {
		this.value = $state(value);
	}

	[SERIALIZE_SYMBOL](): unknown {
		return this.value;
	}

	[DESERIALIZE_SYMBOL](value: unknown) {
		if (value !== undefined && value !== null) {
			this.value = value as Option<Values, IsOptional>;
		}
	}
}

type EnumerationOptions<IsOptional extends boolean> = Partial<{
	optional: IsOptional;
}>;

const DEFAULT_OPTIONS: EnumerationOptions<boolean> = {
	optional: false,
};

export function enumeration<Values, IsOptional extends boolean = false>(
	value: Option<Values, IsOptional>,
	options?: EnumerationOptions<IsOptional>,
) {
	return new EnumWrapper<Values, IsOptional>(value, Object.assign({}, DEFAULT_OPTIONS, options));
}
