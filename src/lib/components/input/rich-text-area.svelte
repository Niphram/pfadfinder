<script lang="ts">
	import type { ClassValue } from 'svelte/elements';

	import { getChar } from '$lib/data/context.svelte';
	import { RangedProperties } from '$lib/text/ranged-properties';

	export type RichInputTextProperties = {
		color: string;
		decoration: string;
	};

	export type RichInputRangedProperties = RangedProperties<RichInputTextProperties>;

	type Props = {
		value: string;
		name: string;
		placeholder?: string;
		class?: ClassValue;

		rows?: number;

		computeTextStyle?: (value: string) => RichInputRangedProperties;
	};

	let {
		value = $bindable(),
		name,
		placeholder,
		class: className,
		rows = 10,
		computeTextStyle,
	}: Props = $props();

	let inputEl: HTMLTextAreaElement;
	let renderEl: HTMLDivElement | undefined = $state();

	function synchronizeScroll() {
		if (renderEl) {
			renderEl.scrollTop = inputEl.scrollTop;
			renderEl.scrollLeft = inputEl.scrollLeft;
		}
	}

	const commonClasses = 'textarea textarea-bordered w-full';

	const textStyle: RichInputRangedProperties = $derived(
		computeTextStyle?.(value) ?? new RangedProperties(value.length),
	);

	const { c } = $derived(getChar());
</script>

<div class="relative">
	<textarea
		bind:this={inputEl}
		bind:value
		{name}
		{placeholder}
		{rows}
		onscroll={synchronizeScroll}
		spellcheck="false"
		class={[
			c.settings.enableMacroHighlighting &&
				'caret-base-content relative z-20 resize-none bg-transparent text-transparent',
			commonClasses,
			className,
		]}
	></textarea>

	{#if c.settings.enableMacroHighlighting}
		<div
			bind:this={renderEl}
			class={[
				'pointer-events-none absolute top-0 left-0 z-0 h-full overflow-scroll break-words whitespace-pre-wrap',
				commonClasses,
				className,
			]}
		>
			{#each textStyle.spans as { start, length, props }, i (i)}
				{@const { color, decoration } = props}
				<span style:color style:text-decoration={decoration}
					>{value.substring(start, start + length)}</span
				>
			{/each}
		</div>
	{/if}
</div>
