export class Array<T> {
	value: T[];

	factory: () => T;

	constructor(value: T[], factory: () => T) {
		this.value = $state(value);
		this.factory = factory;
	}
}

export function array<T>(factory: () => T, value?: T[]) {
	return new Array<T>(value ?? [], factory);
}
