<script lang="ts">
	import { c } from '$lib/data';
	import { parseTextWithMacros } from '$lib/macro/text';

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
