export function integer(value: number) {
	return Number.isInteger(value);
}

export function positive(value: number) {
	return value > 0;
}

export function negative(value: number) {
	return value < 0;
}

export function positive0(value: number) {
	return value >= 0;
}

export function negative0(value: number) {
	return value <= 0;
}
