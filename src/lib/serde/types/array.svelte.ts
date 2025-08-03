import { DESERIALIZE_SYMBOL, SERIALIZE_SYMBOL, type Serializable } from '../interfaces';

export class ArrayWrapper<T extends Serializable<T>> implements Serializable<ArrayWrapper<T>> {
	value: T[];

	factory: () => T;

	constructor(value: T[], factory: () => T) {
		this.value = $state(value);
		this.factory = factory;
	}

	[SERIALIZE_SYMBOL](): unknown {
		return this.value.map((v) => v[SERIALIZE_SYMBOL]());
	}

	[DESERIALIZE_SYMBOL](value: unknown): ArrayWrapper<T> {
		if (Array.isArray(value)) {
			this.value = value.map((v) => this.factory()[DESERIALIZE_SYMBOL](v));
		}

		return this;
	}
}

export function array<T extends Serializable<T>>(factory: () => T, value?: T[]) {
	return new ArrayWrapper<T>(value ?? [], factory);
}
