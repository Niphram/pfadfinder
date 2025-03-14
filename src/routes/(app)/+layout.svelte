<script lang="ts">
	import '../../app.css';

	const { loaded } = getChar();

	import Dialog from '$lib/components/dialog.svelte';
	import ToastProvider from '$lib/components/toast-provider.svelte';
	import { getChar } from '$lib/data/context';
</script>

<div class="print:hidden">
	<Dialog />
	<ToastProvider />

	<div class="bg-base-100 h-screen w-screen">
		{#if $loaded && $loaded}
			<slot />
		{:else}
			<div class="flex h-full w-full items-center justify-center">
				<span class="loading loading-dots loading-lg"></span>
			</div>
		{/if}
	</div>
</div>
