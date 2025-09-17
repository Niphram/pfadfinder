<script lang="ts" module>
	import { fly } from 'svelte/transition';

	import MultilineMacro from '$lib/atoms/multiline-macro.svelte';

	type Notification = {
		title: string;
		content: string;
	};

	let notification: Notification | undefined = $state();

	let timeoutId: number | undefined = $state();

	export function showNotification(
		title: string,
		content: string,
		timeout = 5000,
	) {
		timeoutId && clearTimeout(timeoutId);

		notification = { title, content };

		timeoutId = window.setTimeout(() => (notification = undefined), timeout);
	}
</script>

<div
	class="pointer-events-none fixed right-0 bottom-0 left-0 z-50 flex flex-col gap-2 p-4"
>
	{#if notification}
		<div transition:fly={{ x: -128 }} class="alert alert-info flex flex-col">
			<span class="text-lg">{notification.title}</span>
			{#if notification.content}
				<div class="border-t pt-4">
					<MultilineMacro
						class="block"
						element="span"
						text={notification.content}
					/>
				</div>
			{/if}
		</div>
	{/if}
</div>
