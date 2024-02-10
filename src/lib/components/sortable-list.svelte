<script lang="ts" context="module">
	// Needed to satisfy eslint
	type T = unknown;

	const listMap = new WeakMap<HTMLElement, T[]>();
</script>

<script lang="ts" generics="T">
	import Sortable from 'sortablejs';
	import { onMount } from 'svelte';

	type Options = Omit<Sortable.SortableOptions, 'onUpdate' | 'onAdd' | 'onRemove' | "disabled">;

	export let items: T[];
	export let options: Options | undefined = undefined;

	export let keyProp: keyof T;

	export let disabled = false;

	let className = '';
	export { className as class };

	export let element = 'div';

	let listEl: HTMLElement;

	let sortableInstance: Sortable |undefined;
	$: sortableInstance?.option("disabled", disabled);

	onMount(() => {
		listMap.set(listEl, items);

		sortableInstance = Sortable.create(listEl, {
			onUpdate({ oldIndex = 0, newIndex = 0 }) {
				items.splice(newIndex, 0, items.splice(oldIndex, 1)[0]);
				items = items;
			},
			onAdd({ oldIndex = 0, newIndex = 0, from }) {
				const list = listMap.get(from) as T[];
				if (list) {
					items.splice(newIndex, 0, list[oldIndex]);
					items = items;
				}
			},
			onRemove({ oldIndex = 0 }) {
				items.splice(oldIndex, 1);
				items = items;
			},
			disabled,
			...options
		});

		return () => {
			listMap.delete(listEl);
			sortableInstance?.destroy();
		};
	});
</script>

<svelte:element this={element} class={className} bind:this={listEl}>
	{#each items as item, index (item[keyProp])}
		<slot {item} {index} />
	{/each}

	{#if items.length === 0}
		<slot name="fallback" />
	{/if}
</svelte:element>
