<script lang="ts">
	import { c } from '$lib/data';
	import Makro from '../format/Makro.svelte';
</script>

<button class="btn h-min px-0" on:click on:contextmenu|preventDefault>
	<div class="grid w-full grid-cols-3 divide-x">
		<div class="flex w-full flex-col divide-y text-center">
			<div class="py-1 text-3xl font-extrabold"><Makro expr={$c.ac.total} /></div>
			<div class="py-1 uppercase">AC</div>
		</div>
		<div class="flex w-full flex-col divide-y text-center">
			<div class="py-1 text-3xl font-extrabold"><Makro expr={$c.ac.touch} /></div>
			<div class="py-1 uppercase">Touch</div>
		</div>
		<div class="flex w-full flex-col divide-y text-center">
			<div class="py-1 text-3xl font-extrabold"><Makro expr={$c.ac.flatFooted} /></div>
			<div class="py-1 uppercase">Flat-Footed</div>
		</div>
	</div>
</button>
