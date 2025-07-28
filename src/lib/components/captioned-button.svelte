<script lang="ts">
	import type { MouseEventHandler } from 'svelte/elements';

	import { preventDefault } from '$lib/utils';

	interface Props {
		label: string | number;
		caption: string | number;
		underline?: boolean;
		onclick?: MouseEventHandler<HTMLButtonElement>;
		oncontextmenu?: MouseEventHandler<HTMLButtonElement>;
	}

	let { label, caption, underline = false, onclick, oncontextmenu }: Props = $props();
</script>

<button
	{onclick}
	oncontextmenu={oncontextmenu && preventDefault(oncontextmenu)}
	class="btn h-full w-full p-0"
>
	<div class="divide-base-100 flex w-full flex-col divide-y-2 text-center">
		<div class="py-1 text-3xl font-extrabold">{label}</div>
		<div class="py-1 uppercase decoration-wavy" class:underline>
			{caption}
		</div>
	</div>
</button>
