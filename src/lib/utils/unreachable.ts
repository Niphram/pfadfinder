/**
 * Marks a codepath as unreachable.
 * Throws an error if it is actually called.
 */
export function unreachable(): never {
	throw new Error('Unreachable');
}
