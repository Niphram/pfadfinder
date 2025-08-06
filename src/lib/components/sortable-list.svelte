<script lang="ts" module>
	// Needed to satisfy eslint
	type T = unknown;

	export const listMap = new WeakMap<HTMLElement, T[]>();
</script>

<script lang="ts" generics="T">
	import Sortable from 'sortablejs';
	import { onMount, type Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	type Options = Omit<
		Sortable.SortableOptions,
		'onUpdate' | 'onAdd' | 'onRemove' | 'onMove' | 'onChoose' | 'disabled'
	>;

	interface Props {
		items: T[];
		options?: Options | undefined;
		keyProp: keyof T;
		disabled?: boolean;
		class?: ClassValue;
		keyPrefix?: string;
		element?: string;
		onMove?: ((item: T, targetArray: T[]) => boolean) | undefined;
		children?: Snippet<[{ item: T; index: number }]>;
		fallback?: Snippet;
	}

	let {
		items = $bindable(),
		options = undefined,
		keyProp,
		disabled = false,
		class: className,
		keyPrefix = '',
		element = 'div',
		onMove = undefined,
		children,
		fallback,
	}: Props = $props();

	let listEl: HTMLElement;

	let sortableInstance: Sortable | undefined = $state();

	// Update 'disabled' if it changes
	$effect(() => {
		sortableInstance?.option('disabled', disabled);
	});

	onMount(() => {
		// The that was selected last
		let lastSelectedItem: T;

		listMap.set(listEl, items);

		sortableInstance = Sortable.create(listEl, {
			onUpdate({ oldIndex = 0, newIndex = 0 }) {
				items.splice(newIndex, 0, items.splice(oldIndex, 1)[0]);
			},
			onAdd({ oldIndex = 0, newIndex = 0, from }) {
				const list = listMap.get(from) as T[];
				if (list) {
					items.splice(newIndex, 0, list[oldIndex]);
				}
			},
			onRemove({ oldIndex = 0 }) {
				items.splice(oldIndex, 1);
			},
			onMove({ to }) {
				const targetList = listMap.get(to) as T[];
				return onMove?.(lastSelectedItem, targetList);
			},
			onChoose({ oldIndex = 0 }) {
				lastSelectedItem = items[oldIndex];
			},
			disabled,
			...options,
		});

		return () => {
			listMap.delete(listEl);
			sortableInstance?.destroy();
		};
	});
</script>

<svelte:element this={element} class={className} bind:this={listEl}>
	{#each items as item, index (keyPrefix + item[keyProp])}
		{@render children?.({ item, index })}
	{/each}

	{#if items.length === 0}
		{@render fallback?.()}
	{/if}
</svelte:element>
