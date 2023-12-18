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

		timeoutId = window.setTimeout(() => notification.set(undefined), timeout);
	}
</script>

<div class="pointer-events-none fixed bottom-0 left-0 right-0 z-50 flex flex-col gap-2 p-4">
	{#if $notification}
		<div transition:fly={{ x: -128 }} class="alert alert-info flex flex-col">
			<span class="text-lg">{$notification.title}</span>
			{#if $notification.content}
				<div class="border-t pt-4">
					{#each $notification.content.split('\n') as line}
						<span class="block">{line}</span>
					{/each}
				</div>
			{/if}
		</div>
	{/if}
</div>
