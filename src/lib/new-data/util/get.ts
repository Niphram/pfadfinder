export function get<T, K extends keyof T>(obj: T, key?: K) {
	return key && obj[key];
}
