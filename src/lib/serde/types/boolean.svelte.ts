import { DESERIALIZE_SYMBOL, SERIALIZE_SYMBOL, type Serializable } from '../interfaces';

export class Boolean implements Serializable<Boolean> {
	value: boolean;

	constructor(value: boolean) {
		this.value = $state(value);
	}

	[SERIALIZE_SYMBOL](): unknown {
		return this.value;
	}

	[DESERIALIZE_SYMBOL](value: unknown): Boolean {
		if (typeof value === 'boolean') {
			this.value = value;
		}

		return this;
	}
}

export function boolean(value: boolean) {
	return new Boolean(value);
}
