<script lang="ts">
	export let value: number;

	function add() {
		value = Math.min(value + 1, 99);
	}

	function subtract() {
		value = Math.max(value - 1, 0);
	}
</script>

<div class="flex flex-row items-center gap-4">
	<button class="btn btn-square btn-lg text-4xl" on:click={add}>+</button>

	<span class="font-mono text-6xl">{value.toString().padStart(2, '0')}</span>

	<button class="btn btn-square btn-lg text-4xl" on:click={subtract}>-</button>
</div>
