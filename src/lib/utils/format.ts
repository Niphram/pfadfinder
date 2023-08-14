/**
 * Formats a number to have a plus sign if it is positive
 */
export function withSign(n: number) {
	return n > 0 ? '+' + n : n;
}

export function count(n: number) {
	switch (n % 10) {
		case 1:
			return `${n}st`;
		case 2:
			return `${n}nd`;
		case 3:
			return `${n}rd`;
		default:
			return `${n}th`;
	}
}
