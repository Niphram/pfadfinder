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

/**
 * Throttle to be used with async functions.
 *
 * The given function will be executed on the rising edge.
 * If more invocations occur while the original promise is still pending, the last one will be queued and executed when the promise finishes.
 *
 * @param func Async funtion to be throttled
 */
export function awaited_throttle_re<A extends unknown[]>(
	func: (...args: A) => Promise<void>,
) {
	let blocked = false;
	let queuedEventArgs: A | undefined;

	function run(...args: A) {
		blocked = true;
		queuedEventArgs = undefined;

		void func(...args).finally(() => {
			blocked = false;

			if (queuedEventArgs) {
				run(...queuedEventArgs);
			}
		});
	}

	return (...args: A) => {
		if (!blocked) {
			run(...args);
		} else {
			queuedEventArgs = args;
		}
	};
}
