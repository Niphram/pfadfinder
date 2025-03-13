<script lang="ts">
	import '../../app.css';

	import { loaded } from '$lib/data';

	import Dialog from '$lib/components/dialog.svelte';
	import ToastProvider from '$lib/components/toast-provider.svelte';
</script>

<div class="print:hidden">
	<Dialog />
	<ToastProvider />

	<div class="h-screen w-screen bg-base-100">
		{#if $loaded && $loaded}
			<slot />
		{:else}
			<div class="flex h-full w-full items-center justify-center">
				<span class="loading loading-dots loading-lg"></span>
			</div>
		{/if}
	</div>
</div>
