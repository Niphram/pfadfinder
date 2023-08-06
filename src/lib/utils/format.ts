/**
 * Formats a number to have a plus sign if it is positive
 */
export function withSign(n: number) {
	return n > 0 ? '+' + n : n;
}
