export function preventDefault<E extends Event, Args extends unknown[]>(
	fn: (event: E, ...args: Args) => void,
): (event: E, ...args: Args) => void {
	return function (...args) {
		args[0].preventDefault();
		return fn.apply(fn, args);
	};
}
