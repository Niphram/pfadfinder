<script lang="ts">
	export let label: string | number;
	export let caption: string | number;
</script>

<button on:click class="btn h-full w-full p-0">
	<div class="flex w-full flex-col divide-y text-center">
		<div class="py-1 text-3xl font-extrabold">{label}</div>
		<div class="py-1 uppercase">{caption}</div>
	</div>
</button>
