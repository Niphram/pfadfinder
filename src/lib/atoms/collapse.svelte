<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue, MouseEventHandler } from 'svelte/elements';

	import { preventDefault } from '$lib/utils';

	interface Props {
		open?: boolean;
		icon?: 'arrow' | 'plus' | undefined;
		class?: ClassValue;
		titleClass?: ClassValue;
		contentClass?: ClassValue;
		title?: Snippet<[{ open: boolean }]>;
		children?: Snippet<[{ open: boolean }]>;
		oncontextmenu?: MouseEventHandler<HTMLDivElement>;
	}

	let {
		open = $bindable(false),
		icon = undefined,
		class: className,
		titleClass,
		contentClass,
		title,
		children,
		oncontextmenu,
	}: Props = $props();

	function toggleOpen() {
		open = !open;
	}

	function keydownHandler(event: KeyboardEvent) {
		if (event.code === 'Space') {
			event.preventDefault();
		} else if (event.code === 'Enter') {
			event.preventDefault();
			toggleOpen();
		}
	}

	function keyupHandler(event: KeyboardEvent) {
		if (event.code === 'Space') {
			event.preventDefault();
			toggleOpen();
		}
	}
</script>

<div
	class={[
		'bg-base-200 collapse text-left',
		icon === 'arrow' && 'collapse-arrow',
		icon === 'plus' && 'collapse-plus',
		open ? 'collapse-open' : 'collapse-close',
		className,
	]}
	onclick={toggleOpen}
	oncontextmenu={oncontextmenu && preventDefault(oncontextmenu)}
	onkeydown={keydownHandler}
	onkeyup={keyupHandler}
	role="button"
	tabindex="0"
>
	{#if title}
		<div class={['collapse-title h-min min-h-0 py-2 md:py-4', titleClass]} class:pe-4={!icon}>
			{@render title?.({ open })}
		</div>
	{/if}

	<div class={['collapse-content min-w-0', contentClass]}>
		{@render children?.({ open })}
	</div>
</div>

<style>
	.collapse-arrow > .collapse-title::after {
		top: 50%;
	}
</style>
