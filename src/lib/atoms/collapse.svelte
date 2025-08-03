<script lang="ts">
	import { preventDefault } from '$lib/utils';
	import type { MouseEventHandler } from 'svelte/elements';

	interface Props {
		open?: boolean;
		icon?: 'arrow' | 'plus' | undefined;
		class?: string;
		title?: import('svelte').Snippet;
		children?: import('svelte').Snippet<[{ open: boolean }]>;
		oncontextmenu?: MouseEventHandler<HTMLDivElement>;
		ontoggle?: (open: boolean) => void;
	}

	let {
		open = $bindable(false),
		icon = undefined,
		class: className = '',
		title,
		children,
		oncontextmenu,
		ontoggle,
	}: Props = $props();

	function toggleOpen() {
		open = !open;
		ontoggle?.(open);
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
	class="bg-base-200 collapse text-left {className}"
	class:collapse-arrow={icon === 'arrow'}
	class:collapse-plus={icon === 'plus'}
	class:collapse-open={open}
	class:collapse-close={!open}
	onclick={toggleOpen}
	oncontextmenu={oncontextmenu && preventDefault(oncontextmenu)}
	onkeydown={keydownHandler}
	onkeyup={keyupHandler}
	role="button"
	tabindex="0"
>
	{#if title}
		<div class="collapse-title h-min min-h-0 py-2 md:py-4" class:pe-4={!icon}>
			{@render title?.()}
		</div>
	{/if}

	<div class="collapse-content min-w-0">
		{@render children?.({ open })}
	</div>
</div>

<style>
	.collapse-arrow > .collapse-title::after {
		top: 50%;
	}
</style>
