<script lang="ts">
	export let element: string = 'div';

	const GAPS = {
		sm: 'gap-0',
		md: 'gap-2',
		lg: 'gap-4'
	};

	export let gap: keyof typeof GAPS = 'sm';

	let className: string = '';
	export { className as class };
</script>

<svelte:element this={element} class="flex flex-col {GAPS[gap]} {className}">
	<slot />
</svelte:element>
