<script lang="ts">
	import type { MouseEventHandler } from 'svelte/elements';

	import { preventDefault } from '$lib/utils';

	import { getChar } from '$lib/data';

	interface Props {
		onclick?: MouseEventHandler<HTMLButtonElement>;
		oncontextmenu?: MouseEventHandler<HTMLButtonElement>;
	}

	const { onclick, oncontextmenu }: Props = $props();

	const { c } = $derived(getChar());
</script>

<button
	class="btn h-min px-0"
	{onclick}
	oncontextmenu={oncontextmenu && preventDefault(oncontextmenu)}
>
	<div class="divide-base-100 grid w-full grid-cols-3 divide-x-2">
		<div class="divide-base-100 flex w-full flex-col divide-y-2 text-center">
			<div class="py-1 text-3xl font-extrabold">{c.ac.total}</div>
			<div class="py-1 uppercase">AC</div>
		</div>
		<div class="divide-base-100 flex w-full flex-col divide-y-2 text-center">
			<div class="py-1 text-3xl font-extrabold">{c.ac.touch}</div>
			<div class="py-1 uppercase">Touch</div>
		</div>
		<div class="divide-base-100 flex w-full flex-col divide-y-2 text-center">
			<div class="py-1 text-3xl font-extrabold">{c.ac.flatFooted}</div>
			<div class="py-1 uppercase">Flat-Footed</div>
		</div>
	</div>
</button>
