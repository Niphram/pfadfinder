import { DESERIALIZE_SYMBOL, SERIALIZE_SYMBOL, type Serializable } from '../interfaces';
import type { Option } from '../optional';

export class NumberWrapper<IsOptional extends boolean> implements Serializable {
	value: Option<number, IsOptional>;

	constructor(
		value: Option<number, IsOptional>,
		private readonly options: NumberOptions<IsOptional>,
	) {
		this.value = $state(value);
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

type NumberOptions<IsOptional extends boolean> = Partial<{
	optional: IsOptional;
	min: number;
	max: number;
	integer: boolean;
}>;

const DEFAULT_OPTIONS: NumberOptions<boolean> = {
	optional: false,
	min: -Infinity,
	max: Infinity,
	integer: false,
};

export function number<IsOptional extends boolean = false>(
	value: Option<number, IsOptional>,
	options?: NumberOptions<IsOptional>,
) {
	return new NumberWrapper<IsOptional>(value, Object.assign({}, DEFAULT_OPTIONS, options));
}
