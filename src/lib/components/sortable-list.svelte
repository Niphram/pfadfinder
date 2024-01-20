<script lang="ts" generics="T">
	import Sortable from 'sortablejs';
	import { onMount } from 'svelte';

	type Options = Omit<Sortable.SortableOptions, 'onUpdate'>;

	export let items: T[];
	export let options: Options | undefined = undefined;

	export let keyProp: keyof T;

	let className = '';
	export { className as class };

	let listEl: HTMLDivElement;

	onMount(() => {
		let sortableInstance = Sortable.create(listEl, {
			onUpdate({ oldIndex = 0, newIndex = 0 }) {
				items.splice(newIndex, 0, items.splice(oldIndex, 1)[0]);
				items = items;
			},
			...options
		});

		return () => sortableInstance.destroy();
	});
</script>

<div class={className} bind:this={listEl}>
	{#each items as item, index (item[keyProp])}
		<slot {item} {index} />
	{/each}
</div>
