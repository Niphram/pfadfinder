export function lazy<P extends NonNullable<unknown>>(cb: () => P) {
	let result: P | undefined;

	return () => result ?? (result = cb());
}
