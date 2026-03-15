import {
	DESERIALIZE_SYMBOL,
	SERIALIZE_SYMBOL,
	type Serializable,
} from './interfaces';

export abstract class ClassSerializer implements Serializable {
	[SERIALIZE_SYMBOL](): unknown {
		const result: Partial<Record<string, unknown>> = {};

		for (const [key, value] of Object.entries(this)) {
			if (value && typeof value === 'object' && SERIALIZE_SYMBOL in value) {
				result[key] = value[SERIALIZE_SYMBOL]();
			}
		}

		return result;
	}

	[DESERIALIZE_SYMBOL](value: unknown) {
		if (value && typeof value === 'object') {
			for (const [key, dvalue] of Object.entries(value)) {
				if (
					key in this
					// @ts-expect-error above checks allow this
					&& typeof this[key] === 'object'
					// @ts-expect-error above checks allow this
					&& DESERIALIZE_SYMBOL in this[key]
					// @ts-expect-error above checks allow this
					&& typeof this[key][DESERIALIZE_SYMBOL] === 'function'
				) {
					// @ts-expect-error the above checks sufficiently guard this call
					this[key][DESERIALIZE_SYMBOL](dvalue);
				}
			}
		}
	}
}
