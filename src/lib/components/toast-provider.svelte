<script module lang="ts">
	import {
		createContext,
		getAllContexts,
		type Component,
		type ComponentProps,
	} from 'svelte';

	const [getToastContext, setToastContext] =
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		createContext<ToastSystemContext<any>>();

	type ToastContent<Props extends Record<string, unknown>> = {
		component: Component<Props>;
		props: Props;
		context: Map<unknown, unknown>;
		timeout: number;
	};

	type ToastSystemContext<Props extends Record<string, unknown>> = {
		toasts: ToastContent<Props>[];
	};

	/**
	 * Get access to the toast functions
	 */
	export function useToast() {
		const capturedContext = getAllContexts();
		const toastContext = getToastContext();

		return {
			/**
			 * Shows a toast
			 */
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			showToast: <C extends Component<any>>(
				component: C,
				props: ComponentProps<C>,
				timeout = 2500,
			) => {
				toastContext.toasts.unshift({
					component,
					props,
					context: capturedContext,
					timeout,
				});

				// Limit to three active toasts
				toastContext.toasts = toastContext.toasts.slice(0, 3);
			},
		};
	}
</script>

<script lang="ts">
	import { mount, unmount, type Snippet } from 'svelte';
	import type { Attachment } from 'svelte/attachments';
	import { fly, slide } from 'svelte/transition';

	type Props = {
		children: Snippet;
	};

	const { children }: Props = $props();

	const toastSystemContext: ToastSystemContext<Record<string, unknown>> =
		$state({
			toasts: [],
		});

	function toastAttachment(
		toast: ToastContent<Record<string, unknown>>,
	): Attachment<HTMLDivElement> {
		return (el) => {
			setTimeout(() => {
				// Remove the toast after the timeout
				const index = toastSystemContext.toasts.indexOf(toast);
				if (index >= 0) {
					toastSystemContext.toasts.splice(index, 1);
				}
			}, toast.timeout);

			// Mount the content
			const mountedToast = mount(toast.component, {
				target: el,
				props: toast.props,
				context: toast.context,
			});

			return () => {
				unmount(mountedToast);
			};
		};
	}

	setToastContext(toastSystemContext);
</script>

<div
	class="pointer-events-none fixed right-0 bottom-0 left-0 z-50 flex flex-col"
>
	{#each toastSystemContext.toasts as toast (toast)}
		<div
			in:fly={{ x: -128 }}
			out:slide={{ axis: 'y' }}
			{@attach toastAttachment(toast)}
			class="p-2 pt-0"
		></div>
	{/each}
</div>

{@render children()}
