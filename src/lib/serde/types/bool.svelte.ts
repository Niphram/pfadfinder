import { DESERIALIZE_SYMBOL, SERIALIZE_SYMBOL, type Serializable } from '../interfaces';

export class BoolWrapper implements Serializable<BoolWrapper> {
	value: boolean;

	constructor(value: boolean) {
		this.value = $state(value);
	}

	[SERIALIZE_SYMBOL](): unknown {
		return this.value;
	}

	[DESERIALIZE_SYMBOL](value: unknown): BoolWrapper {
		if (typeof value === 'boolean') {
			this.value = value;
		}

		return this;
	}
}

export function boolean(value: boolean) {
	return new BoolWrapper(value);
}
