<script lang="ts">
	import { title } from '../dialog.svelte';

	export let message: string;

	$title = 'Error';
</script>

<div>{message}</div>

<div class="modal-action">
	<button class="btn">Close</button>
</div>
