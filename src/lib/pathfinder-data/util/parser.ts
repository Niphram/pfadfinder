import papa from 'papaparse';
import type { Readable } from 'node:stream';

export function parse<T>(stream: Readable, dynamicallyTypedFields: (keyof T | number)[]) {
	return new Promise<T[]>((resolve, reject) => {
		papa.parse<T>(stream, {
			header: true,
			dynamicTyping: (field) => dynamicallyTypedFields.includes(field as keyof T | number),
			transform: (value) => (value === 'NULL' ? null : value),
			complete(results) {
				if (results.errors.length > 0) {
					reject(results.errors);
				} else {
					resolve(results.data);
				}
			}
		});
	});
}
