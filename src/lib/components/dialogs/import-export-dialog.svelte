<script lang="ts">
	import { Character, c } from '$lib/data';
	import { DeserializeInto, Serialize } from 'cerialize';
	import { title } from '../dialog.svelte';
	import TextArea from '../input/text-area.svelte';
	import Steps from '../steps.svelte';

	$title = 'Import/Export';

	let value = JSON.stringify(Serialize($c));

	function importChar() {
		const newChar = new Character();
		DeserializeInto(JSON.parse(value), Character, newChar);
		$c = newChar;
	}
</script>

<div class="flex flex-col gap-4">
	<TextArea bind:value name="data" label="Character Data" placeholder="Character Data" rows={10} />

	<Steps
		steps={[
			{ label: 'Import', style: { warning: true, outline: true } },
			{
				label: 'This will overwrite the current character!',
				style: { error: true },
				onClick: importChar
			}
		]}
		let:props={{ label, onClick, style }}
		let:next
	>
		<button
			class="btn w-full"
			class:btn-warning={style.warning}
			class:btn-outline={style.outline}
			class:btn-error={style.error}
			on:click={onClick ??
				((ev) => {
					ev.preventDefault();
					next();
				})}
		>
			{label}
		</button>
	</Steps>
</div>
