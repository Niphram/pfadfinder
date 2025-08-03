import { showNotification } from '$lib/components/toast-provider.svelte';
import type { Character } from '$lib/data';
import { parseTextWithMacros } from '$lib/macro/text';
import type { SerdeProxy } from '$lib/serde/proxy';

export function macroNotify(title: string, notes: string, char: SerdeProxy<Character>) {
	const content = parseTextWithMacros(notes, char);
	showNotification(title, content, 5000);
}
