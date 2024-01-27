export function mapSum<T>(arr: readonly T[], get: (v: T) => number) {
	return arr.reduce((sum, v) => sum + get(v), 0);
}

export function mapMin<T>(arr: T[], get: (v: T) => number) {
	if (arr.length === 0) return undefined;

	return arr.reduce((min, v) => Math.min(min, get(v)), Infinity);
}

export function mapMax<T>(arr: T[], get: (v: T) => number) {
	if (arr.length === 0) return undefined;

	return arr.reduce((min, v) => Math.max(min, get(v)), Infinity);
}
