<script lang="ts">
	import type { ClassValue, MouseEventHandler } from 'svelte/elements';

	interface Props {
		open?: boolean;
		icon?: 'arrow' | 'plus' | undefined;
		class?: ClassValue;
		titleClass?: ClassValue;
		contentClass?: ClassValue;
		oncontextmenu?: MouseEventHandler<HTMLDivElement>;
		title?: import('svelte').Snippet<[{ open: boolean }]>;
		children?: import('svelte').Snippet<[{ open: boolean }]>;
	}

	let {
		open = $bindable(false),
		icon = undefined,
		class: className,
		titleClass,
		contentClass,
		oncontextmenu,
		title: title_renderer,
		children: children_renderer,
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
	{oncontextmenu}
	onkeydown={keydownHandler}
	onkeyup={keyupHandler}
	role="button"
	tabindex="0"
>
	{#if title_renderer}
		<div class={['collapse-title h-min min-h-0 py-2 md:py-4', !icon && 'pe-4', titleClass]}>
			{@render title_renderer?.({ open })}
		</div>
	{/if}

	<div class={['collapse-content min-w-0', contentClass]}>
		{@render children_renderer?.({ open })}
	</div>
</div>

<style>
	.collapse-arrow > .collapse-title::after {
		top: 50%;
	}
</style>
