<script lang="ts">
	import { getChar } from '$lib/data/context';
	import { parseTextWithMacros } from '$lib/macro/text';

	const { c } = getChar();

	export let text: string;
	export let element = 'p';

	let className: string | undefined = undefined;
	export { className as class };

	$: parsed = parseTextWithMacros(text, $c);
	$: lines = parsed.split('\n').filter((line) => line.trim().length > 0);
</script>

{#each lines as line, i (i)}
	<svelte:element this={element} class={className}>{line}</svelte:element>
{/each}
