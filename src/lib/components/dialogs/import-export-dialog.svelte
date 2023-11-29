<script lang="ts">
	import { Character, c } from '$lib/data';
	import { DeserializeInto, Serialize } from 'cerialize';
	import { title } from '../dialog.svelte';
	import TextArea from '../input/text-area.svelte';

	$title = 'Import/Export';

	let value = JSON.stringify(Serialize($c));

	function importChar() {
		const newChar = new Character();
		DeserializeInto(JSON.parse(value), Character, newChar);
		$c = newChar;
	}
</script>

<TextArea bind:value name="data" label="Character Data" placeholder="Character Data" rows={10} />

<button class="btn btn-primary w-full" on:click={importChar}>Import</button>
