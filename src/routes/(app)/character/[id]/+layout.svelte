<script lang="ts">
	import Dialog from '$lib/components/dialog.svelte';
	import ToastProvider from '$lib/components/toast-provider.svelte';
	import type { Character } from '$lib/data';
	import { setChar } from '$lib/data/context';
	import { Derive, Macro } from '$lib/data/macros';
	import { calculateNode } from '$lib/macro/evaluate';
	import { parse, type Node } from '$lib/macro/parser';
	import { debounce } from '$lib/utils';
	import { onMount } from 'svelte';
	import { derived, readable } from 'svelte/store';
	import type { LayoutProps } from './$types';

	const { data, children }: LayoutProps = $props();

	const formulaMap = new Map<string, Node>();

	// TODO: Lots of cleanup

	const p = derived(data.character, (char) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		function makeProxy(obj: any) {
			return new Proxy(obj, {
				get(target, p): unknown {
					if (!(p in target)) throw new Error('Something went wrong');

					if (target[p] instanceof Macro || target[p] instanceof Derive) {
						return target[p].eval(char);
					} else if (typeof target[p] === 'object') {
						return makeProxy(target[p]);
					} else if (typeof target[p] === 'string') {
						if (formulaMap.has(target[p])) {
							return calculateNode(formulaMap.get(target[p])!, char);
						} else {
							const node = parse(target[p]);
							formulaMap.set(target[p], node);
							return calculateNode(node, char);
						}
					}
				}
			});
		}

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return makeProxy(char) as any; // TODO
	});

	setChar(data.character, p, readable(false), readable(true), async () => {});

	const debouncedSave = debounce(async (char: Character) => {
		await data.db.saveCharacter(char);
	}, 1000);

	onMount(() => {
		return data.character.subscribe((char) => {
			debouncedSave(char);
		});
	});
</script>

<div class="print:hidden">
	<Dialog />
	<ToastProvider />

	<div class="h-screen w-screen">
		{@render children()}
	</div>
</div>
