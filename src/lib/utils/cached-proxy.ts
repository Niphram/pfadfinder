/**
 * Returns a function that can be used instead of the proxy constructor.
 * Proxies created using this function will be memoized
 */
export function makeCachedProxyFactory() {
	const MARKER = Symbol();
	const PROXY_MAP = new WeakMap<object, object>();

	return <T extends object>(target: T, { has = Reflect.has, ...handlers }: ProxyHandler<T>) => {
		// Check if the value already is the desired proxy
		if (MARKER in target) return target;

		// Check if proxy for the object already exists
		const cachedProxy = PROXY_MAP.get(target);
		if (cachedProxy) return cachedProxy;

		const proxy = new Proxy(target, {
			has(target, p) {
				// Special marker property
				return p === MARKER || has(target, p);
			},
			...handlers,
		});

		// Cache the proxy
		PROXY_MAP.set(target, proxy);

		return proxy;
	};
}
