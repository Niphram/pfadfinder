<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	interface Props {
		class?: ClassValue;
		children?: Snippet;
	}

	const { class: className, children }: Props = $props();
</script>

<div class={['divider', className]}>
	<div class="flex flex-row items-center gap-2">
		{@render children?.()}
	</div>
</div>
