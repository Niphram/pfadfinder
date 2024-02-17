<script lang="ts" context="module">
	import { cva } from 'cva';

	const column = cva('flex flex-col', {
		variants: {
			gap: {
				sm: 'gap-0',
				md: 'gap-2',
				lg: 'gap-4'
			}
		}
	});
</script>

<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';

	import type { CVAProps } from '../helper-types';

	interface $$Props extends CVAProps<HTMLElement, typeof column> {
		element?: keyof SvelteHTMLElements;
	}

	export let element: $$Props['element'] = 'div';
	export let gap: $$Props['gap'] = 'md';
</script>

<svelte:element this={element} {...$$restProps} class={column({ gap, class: $$props['class'] })}>
	<slot />
</svelte:element>
