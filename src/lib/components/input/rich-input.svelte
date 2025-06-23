<script lang="ts">
	import type { ClassValue } from 'svelte/elements';

	import { getChar } from '$lib/data/context';
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

		computeTextStyle?: (value: string) => RichInputRangedProperties;
	};

	let {
		value = $bindable(),
		name,
		placeholder,
		class: className,
		computeTextStyle,
	}: Props = $props();

	let inputEl: HTMLInputElement;
	let renderEl: HTMLDivElement | undefined = $state();

	function synchronizeScroll() {
		if (renderEl) {
			renderEl.scrollTop = inputEl.scrollTop;
			renderEl.scrollLeft = inputEl.scrollLeft;
		}
	}

	const commonClasses = 'input input-bordered w-full';

	const textStyle: RichInputRangedProperties = $derived(
		computeTextStyle?.(value) ?? new RangedProperties(value.length),
	);

	const { c } = getChar();
</script>

<div class="relative">
	<input
		bind:this={inputEl}
		bind:value
		{name}
		{placeholder}
		onscroll={synchronizeScroll}
		class={[
			$c.settings.enableMacroHighlighting &&
				'caret-base-content z-10 bg-transparent text-transparent',
			commonClasses,
			className,
		]}
	/>

	{#if $c.settings.enableMacroHighlighting}
		<div class={['absolute top-0 left-0 z-0', commonClasses, className]}>
			<div bind:this={renderEl} class="overflow-hidden whitespace-pre">
				{#each textStyle.spans as { start, length, props }, i (i)}
					{@const { color, decoration } = props}
					<span style:color style:text-decoration={decoration}
						>{value.substring(start, start + length)}</span
					>
				{/each}
			</div>
		</div>
	{/if}
</div>
