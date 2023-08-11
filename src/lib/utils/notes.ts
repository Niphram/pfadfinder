import { showNotification } from '$lib/components/toast-provider.svelte';
import { parseTextWithMacros } from '$lib/macro/text';
import type { ICharacter } from '$lib/state';

export function macroNotify(title: string, notes: string, char: ICharacter) {
	const content = parseTextWithMacros(notes, char);
	showNotification(title, content, 5000);
}
