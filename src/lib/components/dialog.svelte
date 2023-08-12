<script lang="ts" context="module">
	import type { ComponentProps, ComponentType, SvelteComponent } from 'svelte';
	import { writable } from 'svelte/store';

	let dialog: HTMLDialogElement;

	const dialogContent = writable<{ component?: ComponentType; props: object }>({
		component: undefined,
		props: {}
	});

	export function openDialog<T extends SvelteComponent>(
		component: ComponentType<T>,
		props: Omit<ComponentProps<T>, 'title'>
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

	export const title = writable('');
</script>

<dialog class="modal" bind:this={dialog}>
	<form
		method="dialog"
		class="modal-box h-full max-h-none w-full max-w-none rounded-none pt-16 md:h-min md:max-h-[calc(100vh-5em)] md:max-w-lg md:rounded-md"
	>
		<div class="fixed left-0 top-0 flex h-12 w-full flex-row items-center bg-base-300 px-4">
			<div class="text-xl font-bold">{$title ?? ''}</div>
			<button class="btn btn-circle btn-ghost btn-sm ml-auto">✕</button>
		</div>

		{#key $dialogContent}
			<svelte:component this={$dialogContent.component} {...$dialogContent.props} />
		{/key}
	</form>
	<form method="dialog" class="modal-backdrop">
		<button>Close</button>
	</form>
</dialog>
