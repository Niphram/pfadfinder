import { DESERIALIZE_SYMBOL, SERIALIZE_SYMBOL, type Serializable } from '../interfaces';

export class ObjectWrapper<T extends object> implements Serializable<ObjectWrapper<T>> {
	value: T;

	constructor(value: T) {
		this.value = $state(value);
	}

	[SERIALIZE_SYMBOL](): unknown {
		const result: Partial<Record<keyof T, unknown>> = {};

		for (const [key, value] of Object.entries(this.value)) {
			if (value && typeof value === 'object' && SERIALIZE_SYMBOL in value) {
				// @ts-expect-error TODO
				result[key] = value[SERIALIZE_SYMBOL]();
			}
		}

		return result;
	}

	[DESERIALIZE_SYMBOL](value: unknown): ObjectWrapper<T> {
		if (value && typeof value === 'object') {
			for (const [key, dvalue] of Object.entries(value)) {
				if (
					key in this.value &&
					// @ts-expect-error TODO
					typeof this.value[key] === 'object' &&
					// @ts-expect-error TODO
					DESERIALIZE_SYMBOL in this.value[key]
				) {
					// @ts-expect-error TODO
					this.value[key][DESERIALIZE_SYMBOL](dvalue);
				}
			}
		}

		return this;
	}
}

export function object<T extends object>(value: T) {
	return new ObjectWrapper(value);
}
