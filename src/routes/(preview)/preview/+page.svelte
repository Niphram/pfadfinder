<script lang="ts">
	import { base } from '$app/paths';
	import { openDialog } from '$lib/components/dialog.svelte';
	import { deleteCharacter, listCharacters } from '$lib/preview/character-store';
	import CreateCharacter from './create-character.svelte';

	let selectedSystem: string | undefined;

	$: characterList = listCharacters(selectedSystem);

	async function deleteChar(id: string) {
		await deleteCharacter(id);

		characterList = listCharacters(selectedSystem);
	}
</script>

<div class="flex flex-col">
	<div class="sticky top-0 z-40 flex h-20 w-full flex-col bg-base-200 drop-shadow-xl">
		<div class="flex flex-row items-stretch gap-2 p-2 align-middle">
			<p class="text-lg font-bold">Pfadfinder</p>
		</div>
	</div>

	<div class="flex-none p-4">
		{#await characterList}
			<div class="flex h-full w-full items-center justify-center">
				<div class="loading loading-dots loading-lg"></div>
			</div>
		{:then characters}
			<h1 class="divider text-lg">Characters</h1>

			<div class="flex flex-col gap-4">
				{#each characters as char}
					<div class="flex flex-row gap-2">
						<a href="{base}/preview/character?id={char.id}" class="flex-grow">
							<div class="btn flex flex-row">
								<p class="flex-grow text-lg">{char.name}</p>
								<p class="badge badge-neutral badge-outline badge-lg">{char.system}</p>
							</div>
						</a>

						<button on:click={() => deleteChar(char.id)} class="btn-xl btn btn-warning">
							Delete
						</button>
					</div>
				{:else}
					<p>No Characters</p>
				{/each}
			</div>
		{/await}

		<div class="h-16" />
	</div>

	<a href={base} class="btn btn-secondary fixed bottom-4 left-4">Back to stable</a>

	<div class="fixed bottom-4 right-4">
		<button class="btn btn-circle btn-primary" on:click={() => openDialog(CreateCharacter, {})}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="size-6"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
			</svg>
		</button>
	</div>
</div>
