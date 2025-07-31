export const SERIALIZE_SYMBOL = Symbol('serialize');
export const DESERIALIZE_SYMBOL = Symbol('deserialize');

export type Serializable<This> = {
	[SERIALIZE_SYMBOL](): unknown;
	[DESERIALIZE_SYMBOL](value: unknown): This;
};
