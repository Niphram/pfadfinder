<script lang="ts">
	import { base } from '$app/paths';
	import { deleteCharacter, listCharacters, saveCharacter } from '$lib/preview/character-store';
	import { KidsOnBikesCharacter } from '$lib/preview/systems/kids-on-bikes/character';
	import { PathfinderCharacter } from '$lib/preview/systems/pathfinder/data/character';

	let selectedSystem: string | undefined;

	$: characterList = listCharacters(selectedSystem);
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
			<button on:click={() => deleteCharacter(char.id)} class="btn btn-warning btn-sm"
				>Delete</button
			>
		</li>
	{/each}
{/await}

<button on:click={() => saveCharacter(new KidsOnBikesCharacter())}
	>Add Kids on Bikes Character</button
>

<br />

<button on:click={() => saveCharacter(new PathfinderCharacter())}>Add Pathfinder Char</button>

<br />

<a href={base} class="btn btn-secondary">Back to stable</a>
