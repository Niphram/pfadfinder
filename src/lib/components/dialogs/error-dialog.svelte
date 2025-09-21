<script lang="ts">
	import DialogBase from '$lib/atoms/dialog-base.svelte';

	interface Props {
		message: string;
	}

	let { message }: Props = $props();
</script>

<DialogBase title="Error">
	<div>{message}</div>

	<div class="modal-action">
		<button class="btn">Close</button>
	</div>
</DialogBase>
