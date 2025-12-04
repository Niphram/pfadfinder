import { useToast } from '$lib/components/toast-provider.svelte';
import MultilineMacroToast from '$lib/components/toasts/multiline-macro-toast.svelte';

export function useMacroNotify() {
	const { showToast } = useToast();

	return {
		macroNotify(title: string, content: string) {
			showToast(MultilineMacroToast, { title, content }, 5000);
		},
	};
}
