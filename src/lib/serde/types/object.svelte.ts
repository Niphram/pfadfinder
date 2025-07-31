import { DESERIALIZE_SYMBOL, SERIALIZE_SYMBOL, type Serializable } from '../interfaces';

export class Object<T extends object> implements Serializable<Object<T>> {
	value: T;

	constructor(value: T) {
		this.value = $state(value);
	}

	[SERIALIZE_SYMBOL](): unknown {
		throw new Error('TODO');
	}

	[DESERIALIZE_SYMBOL](value: unknown): Object<T> {
		throw new Error('TODO');
	}
}

export function object<T extends object>(value: T) {
	return new Object(value);
}
