<script lang="ts">
	import '../../../app.css';

	import Dialog from '$lib/components/dialog.svelte';
	import ToastProvider from '$lib/components/toast-provider.svelte';
</script>

<div class="print:hidden">
	<Dialog />
	<ToastProvider />

	<div class="min-h-screen w-screen">
		<slot />
	</div>
</div>
