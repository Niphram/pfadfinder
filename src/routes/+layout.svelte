<script lang="ts">
	import '../app.css';

	import { loaded } from '$lib/state/character';

	import Dialog from '$lib/components/dialog.svelte';
	import ToastProvider from '$lib/components/toast-provider.svelte';
</script>

<div class="print:hidden">
	<Dialog />
	<ToastProvider />

	<div class="h-screen w-screen">
		{#if $loaded}
			<slot />
		{:else}
			<div class="flex h-full w-full items-center justify-center">
				<span class="loading loading-dots loading-lg" />
			</div>
		{/if}
	</div>
</div>

<div class="hidden print:block">Still not implemented :{'('}</div>
