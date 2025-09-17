interface ObjectConstructor {
	keys<T>(arg: T): (keyof T)[];

	// eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-explicit-any
	entries(o: {}): [string, any][];
	entries<T>(arg: T): {
		[K in keyof T]: [K, T[K]];
	}[keyof T][];

	getOwnPropertyDescriptors<T>(arg: T): {
		[P in keyof T]: TypedPropertyDescriptor<T[P]>;
	};
}
