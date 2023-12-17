<script lang="ts">
	export let label: string | number;
	export let caption: string | number;

	export let underline = false;
</script>

<button on:click on:contextmenu|preventDefault class="btn btn-neutral h-full w-full p-0">
	<div class="flex w-full flex-col divide-y-2 divide-base-100 text-center">
		<div class="py-1 text-3xl font-extrabold">{label}</div>
		<div class="py-1 uppercase decoration-wavy" class:underline>
			{caption}
		</div>
	</div>
</button>
