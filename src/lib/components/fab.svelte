<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { MouseEventHandler } from 'svelte/elements';

	interface Props {
		onclick?: MouseEventHandler<HTMLButtonElement>;
		oncontextmenu?: MouseEventHandler<HTMLButtonElement>;

		children?: Snippet;
	}

	let { onclick, oncontextmenu, children }: Props = $props();
</script>

<div class="fixed right-4 bottom-4 print:hidden">
	<button class="btn btn-circle btn-primary" {onclick} {oncontextmenu}>
		{@render children?.()}
	</button>
</div>
