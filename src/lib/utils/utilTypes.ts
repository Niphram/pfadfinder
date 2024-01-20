export type DeepPartial<T extends object> = {
	[P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type PickProps<T extends object, P> = {
	[K in keyof T]: T[K] extends P ? T[K] : never;
};

export type Predicate<T> = (value: T) => boolean;

export type Stringable = string | number | bigint | boolean | null | undefined;

export type StringKeyof<T> = keyof T & string;

export type Split<S extends string, D extends string> =
	S extends `${infer T}${D}${infer Rest}` ? [T, ...Split<Rest, D>] : [S];

export type Paths<T> =
	T extends Stringable ? never
	: T extends Array<infer U> ? `${number}` | `${number}.${Paths<U>}`
	: | StringKeyof<T>
		| {
				[K in StringKeyof<T>]: `${K}.${Paths<T[K]>}`;
		  }[StringKeyof<T>];

type Index<T, P> =
	T extends Array<infer U> ? U
	: P extends StringKeyof<T> ? T[P]
	: never;

export type Get<T, P extends Paths<T>> =
	P extends `${infer Key}.${infer Rest}` ?
		Rest extends Paths<Index<T, Key>> ?
			Get<Index<T, Key>, Rest>
		:	never
	:	Index<T, P>;
