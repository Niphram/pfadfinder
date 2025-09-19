/**
 * Simple throttle that triggers on the falling edge.
 *
 * @param func Function to be throttled
 * @param timeout Time in milliseconds to block after the first event
 */
export function throttle_fe<A extends unknown[]>(
	func: (...args: A) => void,
	timeout = 1000,
) {
	let blocked = false;
	let lastEventArgs: A;

	return (...args: A) => {
		lastEventArgs = args;

		if (!blocked) {
			blocked = true;
			window.setTimeout(() => {
				blocked = false;
				func(...lastEventArgs);
			}, timeout);
		}
	};
}
