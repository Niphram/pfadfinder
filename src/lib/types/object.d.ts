interface ObjectConstructor {
	keys<T>(arg: T): (keyof T)[];

	getOwnPropertyDescriptors<T>(arg: T): { [P in keyof T]: TypedPropertyDescriptor<T[P]> };
}
