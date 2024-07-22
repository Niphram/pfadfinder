import DeepProxy from 'proxy-deep';
import { Derive } from './derive';
import { Macro } from './macro';

export function macroProxy<O extends NonNullable<unknown>>(obj: O) {
	return new DeepProxy(obj, {
		get(target, key, receiver) {
			const val = Reflect.get(target, key, receiver);

			if (val instanceof Derive) {
				return val.eval(this.rootTarget);
			} else if (val instanceof Macro) {
				return this.nest(val);
			} else if (typeof val === 'object' && val !== null) {
				return this.nest(val);
			} else {
				return val;
			}
		},
		set(target, p, value, receiver) {
			target[p] = value;

			return true;
		},
		apply(target, thisArg, argArray) {
			console.log(this.path);
			return target(this.rootTarget);
		}
	});
}
