<script lang="ts" context="module">
	import { writable } from 'svelte/store';
	import { fly } from 'svelte/transition';

	type Notification = {
		title: string;
		content: string;
	};

	const notification = writable<Notification | undefined>(undefined);

	let timeoutId: number | undefined;

	export function showNotification(title: string, content: string, timeout = 5000) {
		timeoutId && clearTimeout(timeoutId);

		notification.set({ title, content });

		timeoutId = setTimeout(() => notification.set(undefined), timeout);
	}
</script>

<div class="fixed bottom-0 left-0 z-50 flex w-64 flex-col gap-2 whitespace-nowrap p-4">
	{#if $notification}
		<div transition:fly={{ x: -128 }} class="alert alert-info flex flex-col">
			<span class="text-lg">{$notification.title}</span>
			{#if $notification.content}
				<span class="border-t pt-4">{$notification.content}</span>
			{/if}
		</div>
	{/if}
</div>
