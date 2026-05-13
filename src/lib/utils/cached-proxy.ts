/**
 * Returns a function that can be used instead of the proxy constructor.
 * Proxies created using this function will be memoized
 */
export function makeCachedProxyFactory() {
	const MARKER = Symbol();
	const PROXY_MAP = new WeakMap<object, object>();

	function isProxy<T extends object>(obj: T): obj is T & { [MARKER]: T } {
		return !!(obj as { [MARKER]?: T })[MARKER];
	}

	return <T extends object>(target: T, handler: ProxyHandler<T>) => {
		// Check if the value already is the desired proxy
		if (isProxy(target)) return target;

		// Check if proxy for the object already exists
		const cachedProxy = PROXY_MAP.get(target);
		if (cachedProxy) return cachedProxy;

		const get: ProxyHandler<T>['get'] = (...args) =>
			handler.get ? handler.get(...args) : Reflect.get(...args);

		const set: ProxyHandler<T>['set'] = (...args) =>
			handler.set ? handler.set(...args) : Reflect.set(...args);

		const proxy = new Proxy(target, {
			...handler,
			get(wrappedTarget, p, receiver) {
				// Special marker property
				if (p === MARKER) {
					return wrappedTarget;
				}

				return get(wrappedTarget, p, receiver);
			},
			set(wrappedTarget, p, newValue, receiver) {
				// If the new value is a proxy created using this factory, unwrap it
				if (newValue !== undefined && newValue !== null && isProxy(newValue)) {
					return set(wrappedTarget, p, newValue[MARKER], receiver);
				} else {
					return set(wrappedTarget, p, newValue, receiver);
				}
			},
		});

		// Cache the proxy
		PROXY_MAP.set(target, proxy);

		return proxy;
	};
}
