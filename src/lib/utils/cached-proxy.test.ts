import { describe, expect, test } from 'vitest';

import { makeCachedProxyFactory } from './cached-proxy';

describe('makeCachedProxyFactory', () => {
	test('should return different factories', () => {
		const factoryA = makeCachedProxyFactory();
		const factoryB = makeCachedProxyFactory();

		expect(factoryA).not.toBe(factoryB);
	});

	describe('Proxy', () => {
		const factory = makeCachedProxyFactory();

		test('should not block [[HasProperty]]', () => {
			const testObject = { foo: 1 };

			const proxy = factory(testObject, {});

			expect(proxy).toHaveProperty('foo');
		});

		test('should cache created proxies', () => {
			const testObject = {};

			const proxyA = factory(testObject, {});
			const proxyB = factory(testObject, {});

			expect(proxyA).toBe(proxyB);
		});

		test('should not affect already proxied objects', () => {
			const testObject = {};

			const proxyA = factory(testObject, {});
			const proxyB = factory(proxyA, {});

			expect(proxyA).toBe(proxyB);
		});
	});
});
