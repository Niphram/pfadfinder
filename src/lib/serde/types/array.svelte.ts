import {
	DESERIALIZE_SYMBOL,
	SERIALIZE_SYMBOL,
	type Serializable,
} from '../interfaces';

export class ArrayWrapper<T extends Serializable> implements Serializable {
	value: T[];

	constructor(
		value: T[],
		private readonly factory: () => T,
	) {
		this.value = $state(value);
	}

	[SERIALIZE_SYMBOL](): unknown {
		return this.value.map((v) => v[SERIALIZE_SYMBOL]());
	}

	[DESERIALIZE_SYMBOL](value: unknown) {
		if (Array.isArray(value)) {
			this.value = value.map((v) => {
				const element = this.factory();
				element[DESERIALIZE_SYMBOL](v);
				return element;
			});
		}
	}
}

export function array<T extends Serializable>(factory: () => T, value?: T[]) {
	return new ArrayWrapper<T>(value ?? [], factory);
}
