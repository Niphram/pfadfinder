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

	satisfiedBy(v: number | undefined): boolean {
		if (v === undefined) return this.options.optional;

		if (v < (this.options.min ?? -Infinity)) return false;
		if (v > (this.options.max ?? Infinity)) return false;

		if (this.options.integer && !Number.isInteger(v)) return false;

		return true;
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

type NumberOptions<IsOptional extends boolean> = {
	optional: IsOptional;
	min?: number;
	max?: number;
	integer: boolean;
};

const DEFAULT_OPTIONS: NumberOptions<boolean> = {
	optional: false,
	integer: false,
};

export function number<IsOptional extends boolean = false>(
	value: Option<number, IsOptional>,
	options?: Partial<NumberOptions<IsOptional>>,
) {
	return new NumberWrapper<IsOptional>(value, Object.assign({}, DEFAULT_OPTIONS, options));
}
