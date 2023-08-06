<script lang="ts" context="module">
	import type { ComponentProps, ComponentType, SvelteComponent } from 'svelte';
	import { writable } from 'svelte/store';

	let dialog: HTMLDialogElement;

	const dialogContent = writable<{ component?: ComponentType; props: any }>({
		component: undefined,
		props: {}
	});

	export function openDialog<T extends SvelteComponent>(
		component: ComponentType<T>,
		props: ComponentProps<T>
	) {
		dialogContent.set({
			component,
			props
		});

		dialog.showModal();
	}

	export function closeDialog() {
		dialog.close();
	}
</script>

<dialog class="modal" bind:this={dialog}>
	<form method="dialog" class="modal-box">
		<button class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">✕</button>
		{#key $dialogContent}
			<svelte:component this={$dialogContent.component} {...$dialogContent.props} />
		{/key}
	</form>
	<form method="dialog" class="modal-backdrop">
		<button>Close</button>
	</form>
</dialog>
