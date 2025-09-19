import { makeCachedProxyFactory } from './cached-proxy';

/**
 * deeply proxies the object and observes mutations.
 * NOTICE: setting properties on the proxy will only do so, if the old and new value are not equal.
 * This means, `p.foo = p.foo` will be a NOOP and won't trigger underlying updates (e.g. svelte $state).
 *
 * @param obj object to be proxied
 * @param cb callback to be invoked on [[Set]] calls
 */
export function observeMutations<T extends object>(
	obj: T,
	cb: (obj: T) => void,
) {
	const proxyFactory = makeCachedProxyFactory();

	function makeObserverProxy(value: object) {
		return proxyFactory(value, {
			get(target, key) {
				const prop = Reflect.get(target, key);

				// Create nested proxy if the property is an object
				if (prop !== null && typeof prop === 'object')
					return makeObserverProxy(prop);

				return prop;
			},
			set(target, key, newValue) {
				const oldValue = Reflect.get(target, key);

				// Only set the property if the old and new value are different
				let res = true;
				if (newValue !== oldValue) {
					res = Reflect.set(target, key, newValue);

					// Callback, if set was a success
					if (res) cb(obj);
				}

				return res;
			},
		});
	}

	return makeObserverProxy(obj) as T;
}
