import { showNotification } from '$lib/components/toast-provider.svelte';
import type { Character } from '$lib/data';
import { parseTextWithMacros } from '$lib/macro/text';

export function macroNotify(title: string, notes: string, char: Character) {
	const content = parseTextWithMacros(notes, char);
	showNotification(title, content, 5000);
}
