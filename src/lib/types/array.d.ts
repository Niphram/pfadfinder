interface Array<T> {
	filter<S extends T>(
		predicate: BooleanConstructor,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		thisArg?: any,
	): (S extends false | 0 | '' | null | undefined | 0n ? never : S)[];
}

interface ReadonlyArray<T> {
	filter<S extends T>(
		predicate: BooleanConstructor,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		thisArg?: any,
	): (S extends false | 0 | '' | null | undefined | 0n ? never : S)[];
}
