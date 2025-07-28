<script lang="ts" module>
	import type { Component, ComponentProps, SvelteComponent } from 'svelte';
	import { writable } from 'svelte/store';

	let dialog: HTMLDialogElement;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const dialogContent = writable<{ component?: Component<any>; props: object }>({
		component: undefined,
		props: {},
	});

	export function openDialog<T extends SvelteComponent>(
		component: Component<T>,
		props: Omit<ComponentProps<T>, 'title'>,
	) {
		dialogContent.set({
			component,
			props,
		});

		dialog.showModal();
	}

	export function closeDialog() {
		dialog.close();
	}

	export const title = writable('');

	function clearStore() {
		dialogContent.set({ props: {} });
	}
</script>

<script>
	const DialogComponent = $derived($dialogContent.component);
</script>

<dialog class="modal" bind:this={dialog} onclose={clearStore}>
	<form
		method="dialog"
		class="modal-box h-full max-h-none w-full max-w-none rounded-none pt-16 md:h-min md:max-h-[calc(100vh-5em)] md:max-w-lg md:rounded-md"
	>
		<div class="bg-base-200 fixed top-0 left-0 flex h-12 w-full flex-row items-center px-4">
			<div class="text-xl font-bold">{$title ?? ''}</div>
			<button class="btn btn-circle btn-ghost btn-sm ml-auto">✕</button>
		</div>

		{#key $dialogContent}
			<DialogComponent {...$dialogContent.props} />
		{/key}
	</form>
	<form method="dialog" class="modal-backdrop">
		<button>Close</button>
	</form>
</dialog>
