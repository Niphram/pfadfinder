/**
 * Simple debounce
 * @param func Function to be debounced
 * @param timeout Time in milliseconds to wait after the last event
 */
export function debounce<A extends unknown[]>(func: (...args: A) => void, timeout = 1000) {
	let timeoutId: ReturnType<typeof setTimeout> | undefined;

	return (...args: A) => {
		timeoutId && clearTimeout(timeoutId);
		timeoutId = setTimeout(() => func(...args), timeout);
	};
}
