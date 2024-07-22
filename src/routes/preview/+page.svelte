<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { deleteCharacter, listCharacters, saveCharacter } from '$lib/preview/character-store';
	import { SYSTEM_MAP, type SystemName } from '$lib/preview/systems';

	let selectedSystem: string | undefined;

	$: characterList = listCharacters(selectedSystem);

	function createAndOpenCharacter(system: SystemName) {
		saveCharacter(new SYSTEM_MAP[system].character()).then((id) =>
			goto(`${base}/preview/character?id=${id}`)
		);
	}

	async function deleteChar(id: string) {
		await deleteCharacter(id);

		characterList = listCharacters(selectedSystem);
	}
</script>

<h1>Home</h1>

<select bind:value={selectedSystem}>
	<option value={undefined}>-</option>
	<option value="pathfinder">Pathfinder</option>
	<option value="kids-on-bikes">Kids On Bikes</option>
</select>

{#await characterList}
	Loading...
{:then characters}
	{#each characters as char}
		<li>
			<a href="{base}/preview/character?id={char.id}"
				>[{char.system}] {char.name} ({char.id}) ({char.updated.toLocaleString()})</a
			>
			<button on:click={() => deleteChar(char.id)} class="btn btn-warning btn-sm">Delete</button>
		</li>
	{/each}
{/await}

<button on:click={() => createAndOpenCharacter('kids-on-bikes')}>Add Kids on Bikes Character</button
>

<br />

<button on:click={() => createAndOpenCharacter('pathfinder')}>Add Pathfinder Char</button>

<br />

<a href={base} class="btn btn-secondary">Back to stable</a>
