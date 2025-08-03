<script lang="ts">
	import { getChar } from '$lib/data/context.svelte';
	import { parseTextWithMacros } from '$lib/macro/text';

	const { c } = $derived(getChar());

	interface Props {
		text: string;
		element?: string;
		class?: string | undefined;
	}

	let { text, element = 'p', class: className = undefined }: Props = $props();

	let parsed = $derived(parseTextWithMacros(text, c));
	let lines = $derived(parsed.split('\n').filter((line) => line.trim().length > 0));
</script>

{#each lines as line, i (i)}
	<svelte:element this={element} class={className}>{line}</svelte:element>
{/each}
