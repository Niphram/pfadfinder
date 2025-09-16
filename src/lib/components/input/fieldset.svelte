<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	type Props = {
		legend?: string;
		children: Snippet<[]>;
		class?: ClassValue;
	};

	const { legend, children, class: classname }: Props = $props();
</script>

<fieldset class={['fieldset w-full', classname]}>
	{#if legend}
		<legend class="fieldset-legend py-0">{legend}</legend>
	{/if}
	{@render children()}
</fieldset>
