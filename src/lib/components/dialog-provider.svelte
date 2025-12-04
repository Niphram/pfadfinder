<script module lang="ts">
	import {
		createContext,
		getAllContexts,
		type Component,
		type ComponentProps,
	} from 'svelte';

	const [getDialogContext, setDialogContext] =
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		createContext<DialogSystemContext<any>>();

	type DialogContent<Props extends Record<string, unknown>> = {
		component: Component<Props>;
		props: Props;
		context: Map<unknown, unknown>;
	};

	type DialogSystemContext<Props extends Record<string, unknown>> = {
		content: DialogContent<Props>[];
	};

	/**
	 * Get access to the dialog functions
	 */
	export function useDialog() {
		const capturedContext = getAllContexts();
		const dialogContext = getDialogContext();

		return {
			/**
			 * Opens a new dialog
			 */
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			openDialog: <C extends Component<any>>(
				component: C,
				props: ComponentProps<C>,
			) => {
				dialogContext.content.push({
					component,
					props,
					context: capturedContext,
				});
			},

			/**
			 * Replaces the current dialog
			 */
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			replaceDialog: <C extends Component<any>>(
				component: C,
				props: ComponentProps<C>,
			) => {
				dialogContext.content[dialogContext.content.length - 1] = {
					component,
					props,
					context: capturedContext,
				};
			},

			/**
			 * Closes the newest dialog
			 */
			popDialog() {
				dialogContext.content.pop();
			},

			/**
			 * Closes all open dialogs
			 */
			closeAll() {
				dialogContext.content = [];
			},
		};
	}
</script>

<script lang="ts">
	import { mount, unmount, type Snippet } from 'svelte';
	import type { Attachment } from 'svelte/attachments';

	import { rafraf } from '$lib/utils';

	type Props = {
		children: Snippet;
	};

	const { children }: Props = $props();

	const dialogSystemContext: DialogSystemContext<Record<string, unknown>> =
		$state({
			content: [],
		});

	function dialogAttachment(
		content: DialogContent<Record<string, unknown>>,
	): Attachment<HTMLDialogElement> {
		return (el) => {
			el.addEventListener(
				'close',
				() => {
					// Remove the content from context when the dialog closes
					const index = dialogSystemContext.content.indexOf(content);
					if (index >= 0) {
						dialogSystemContext.content.splice(index, 1);
					}
				},
				{
					capture: false,
					once: true,
					passive: true,
				},
			);

			// Mount the content
			const mountedDialog = mount(content.component, {
				target: el,
				props: content.props,
				context: content.context,
			});

			// double raf so intro transition can play
			rafraf(() => el.showModal());

			return () => {
				unmount(mountedDialog);
			};
		};
	}

	// simple "transition" to allow css animations to end
	function waitTransition(el: HTMLDialogElement) {
		// Make sure the dialog actually closes
		el.close();

		return {
			duration: 500,
		};
	}

	setDialogContext(dialogSystemContext);
</script>

{#each dialogSystemContext.content as content (content)}
	<dialog
		class="modal"
		{@attach dialogAttachment(content)}
		out:waitTransition
	></dialog>
{/each}

{@render children()}
