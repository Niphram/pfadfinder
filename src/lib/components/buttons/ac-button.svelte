<script lang="ts">
	import { getChar } from '$lib/data/context';

	const { c } = getChar();
</script>

<button class="btn h-min px-0" on:click on:contextmenu|preventDefault>
	<div class="divide-base-100 grid w-full grid-cols-3 divide-x-2">
		<div class="divide-base-100 flex w-full flex-col divide-y-2 text-center">
			<div class="py-1 text-3xl font-extrabold">{$c.ac.total.eval($c)}</div>
			<div class="py-1 uppercase">AC</div>
		</div>
		<div class="divide-base-100 flex w-full flex-col divide-y-2 text-center">
			<div class="py-1 text-3xl font-extrabold">{$c.ac.touch.eval($c)}</div>
			<div class="py-1 uppercase">Touch</div>
		</div>
		<div class="divide-base-100 flex w-full flex-col divide-y-2 text-center">
			<div class="py-1 text-3xl font-extrabold">{$c.ac.flatFooted.eval($c)}</div>
			<div class="py-1 uppercase">Flat-Footed</div>
		</div>
	</div>
</button>
