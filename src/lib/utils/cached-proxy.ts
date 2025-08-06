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

	return <T extends object>(
		target: T,
		{ get = Reflect.get, set = Reflect.set, ...handlers }: ProxyHandler<T>,
	) => {
		// Check if the value already is the desired proxy
		if (isProxy(target)) return target;

		// Check if proxy for the object already exists
		const cachedProxy = PROXY_MAP.get(target);
		if (cachedProxy) return cachedProxy;

		const proxy = new Proxy(target, {
			get(target, p, receiver) {
				// Special marker property
				if (p === MARKER) {
					return target;
				}

				return get(target, p, receiver);
			},
			set(target, p, newValue, receiver) {
				// If the new value is a proxy created using this factory, unwrap it
				if (newValue !== undefined && newValue !== null && isProxy(newValue)) {
					return set(target, p, newValue[MARKER], receiver);
				} else {
					return set(target, p, newValue, receiver);
				}
			},
			...handlers,
		});

		// Cache the proxy
		PROXY_MAP.set(target, proxy);

		return proxy;
	};
}
