<script lang="ts">
	import type { ClassValue } from 'svelte/elements';

	import { getChar } from '$lib/data/context';
	import { parseTextWithMacros } from '$lib/macro/text';

	const { c } = $derived(getChar());

	interface Props {
		text: string;
		element?: string;
		class?: ClassValue;
	}

	let { text, element = 'p', class: className }: Props = $props();

	let parsed = $derived(parseTextWithMacros(text, c));
	let lines = $derived(parsed.split('\n').filter((line) => line.trim().length > 0));
</script>

{#each lines as line, i (i)}
	<svelte:element this={element} class={className}>{line}</svelte:element>
{/each}
