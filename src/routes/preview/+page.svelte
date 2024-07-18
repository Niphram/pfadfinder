<script lang="ts">
	import { base } from '$app/paths';
	import { addCharacter, deleteCharacter, listCharacters } from '$lib/preview/character-store';
</script>

<h1>Home</h1>

{#await listCharacters()}
	Loading...
{:then characters}
	{#each characters as char}
		<li>
			<a href="{base}/preview/character/{char.id}">{char.name} ({char.id})</a>
			<button on:click={() => deleteCharacter(char.id)} class="btn btn-warning btn-sm"
				>Delete</button
			>
		</li>
	{/each}
{/await}

<button on:click={() => addCharacter()}>Add Char</button>

<br />

<a href="/" class="btn btn-secondary">Back to stable</a>
