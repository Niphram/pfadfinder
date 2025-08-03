import { DESERIALIZE_SYMBOL, SERIALIZE_SYMBOL, type Serializable } from '../interfaces';

export class ObjectWrapper<T extends object> implements Serializable<ObjectWrapper<T>> {
	value: T;

	constructor(value: T) {
		this.value = $state(value);
	}

	[SERIALIZE_SYMBOL](): unknown {
		throw new Error('TODO');
	}

	[DESERIALIZE_SYMBOL](_value: unknown): ObjectWrapper<T> {
		throw new Error('TODO');
	}
}

export function object<T extends object>(value: T) {
	return new ObjectWrapper(value);
}
