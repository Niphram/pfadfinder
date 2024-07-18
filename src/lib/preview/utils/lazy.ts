export function lazy<R extends NonNullable<unknown>>(cb: () => R): () => R {
	let s: R | undefined;

	return function () {
		return s ?? (s = cb());
	};
}
