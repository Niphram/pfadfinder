import {
	DESERIALIZE_SYMBOL,
	SERIALIZE_SYMBOL,
	type Serializable,
} from '../interfaces';

export class BoolWrapper implements Serializable {
	value: boolean;

	constructor(value: boolean) {
		this.value = $state(value);
	}

	[SERIALIZE_SYMBOL](): unknown {
		return this.value;
	}

	[DESERIALIZE_SYMBOL](value: unknown) {
		if (typeof value === 'boolean') {
			this.value = value;
		}
	}
}

export function boolean(value: boolean) {
	return new BoolWrapper(value);
}
