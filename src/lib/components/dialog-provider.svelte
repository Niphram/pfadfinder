<script module lang="ts">
	import { getAllContexts, getContext, type Component } from 'svelte';

	const DIALOG_SYSTEM_CONTEXT = Symbol('dialog-system-context');

	type DialogSystemContext<Props extends Record<string, unknown>> = {
		content?: {
			component: Component<Props>;
			props: Props;
			context: Map<unknown, unknown>;
		};
	};

	/**
	 * Get access to the dialog functions
	 */
	export function useDialog() {
		const capturedContext = getAllContexts();
		const dialogContext = getContext(
			DIALOG_SYSTEM_CONTEXT,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		) as DialogSystemContext<any>;

		return {
			openDialog: <Props extends Record<string, unknown>>(
				component: Component<Props>,
				props: Props,
			) => {
				dialogContext.content = {
					component,
					props,
					context: capturedContext,
				};
			},

			closeDialog() {
				dialogContext.content = undefined;
			},
		};
	}
</script>

<script lang="ts">
	import { mount, setContext, unmount, type Snippet } from 'svelte';
	import type { Attachment } from 'svelte/attachments';

	import { rafraf } from '$lib/utils';

	type Props = {
		children: Snippet;
	};

	const { children }: Props = $props();

	const dialogSystemContext: DialogSystemContext<Record<string, unknown>> =
		$state({
			content: undefined,
		});

	const dialogAttachment: Attachment<HTMLDialogElement> = (el) => {
		let mountedDialog: Record<string, unknown> | undefined;

		if (dialogSystemContext.content) {
			// Mount the content
			mountedDialog = mount(dialogSystemContext.content.component, {
				target: el,
				props: dialogSystemContext.content.props,
				context: dialogSystemContext.content.context,
			});

			// double raf so intro transition can play
			rafraf(() => el.showModal());
		} else {
			// when no content, close the dialog
			el.close();
		}

		return () => {
			if (mountedDialog) {
				// Wait a bit before unmounting to allow transitions to finish
				setTimeout(() => {
					unmount(mountedDialog);
				}, 500);
			}
		};
	};

	setContext(DIALOG_SYSTEM_CONTEXT, dialogSystemContext);
</script>

<dialog
	class="modal max-h-screen! max-w-screen!"
	{@attach dialogAttachment}
	onclose={() => (dialogSystemContext.content = undefined)}
></dialog>

{@render children()}
