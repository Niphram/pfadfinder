<script lang="ts">
	import { title } from '$lib/components/dialog.svelte';

	interface Props {
		message: string;
	}

	let { message }: Props = $props();

	$title = 'Error';
</script>

<div>{message}</div>

<div class="modal-action">
	<button class="btn">Close</button>
</div>
