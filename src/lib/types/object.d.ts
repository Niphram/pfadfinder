interface ObjectConstructor {
	keys<T>(arg: T): (keyof T)[];

	entries<T>(arg: T): {
		[K in keyof T]: [K, T[K]];
	}[keyof T][];

	getOwnPropertyDescriptors<T>(arg: T): { [P in keyof T]: TypedPropertyDescriptor<T[P]> };
}
