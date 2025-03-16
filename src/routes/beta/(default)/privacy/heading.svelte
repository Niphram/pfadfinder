<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		id?: string;
		type: 'h1' | 'h2' | 'h3';
		children?: Snippet;
	}

	let { type, id = undefined, children: children_render }: Props = $props();
</script>

<svelte:element this={type} {id}>
	{#if id}
		<a aria-hidden="true" tabindex="-1" href="#{id}">
			<span
				class="relative -mt-1 mr-1 inline-block align-middle text-base font-bold opacity-20 hover:opacity-60"
			>
				#
			</span>
		</a>
	{/if}
	{@render children_render?.()}
</svelte:element>
