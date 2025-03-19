<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { base } from '$app/paths';
	import { Character } from '$lib/data';
	import { DeserializeInto } from 'cerialize';
	import type { PageProps } from './$types';
	import { nanoid } from 'nanoid';

	const { data }: PageProps = $props();

	async function createChar() {
		const char = new Character();
		await data.db.saveCharacter(char);
		invalidate('idb:characters');
	}

	async function deleteChar(id: string) {
		await data.db.deleteCharacter(id);
		invalidate('idb:characters');
	}

	let files = $state<FileList>();
	const validInputFile = $derived(files?.length === 1 && files[0].type === 'application/json');

	async function importChar() {
		if (files?.length !== 1) {
			return alert('No file selected!');
		}

		try {
			const file = files[0];
			const fileContent = await file.text();

			const newChar = new Character();
			DeserializeInto(JSON.parse(fileContent), Character, newChar);
			newChar.id = nanoid();

			await data.db.saveCharacter(newChar);

			invalidate('idb:characters');
		} catch (_err) {
			alert('Could not import character!');
		}
	}
</script>

<div class="flex w-full justify-center">
	<div class="flex w-full max-w-3xl flex-col gap-4">
		<div role="alert" class="alert alert-warning">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6 shrink-0 stroke-current"
				fill="none"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
				/>
			</svg>
			<span>
				This version of the app is currently under development. It can be used with characters that
				are created here, but keep in mind that the character in the main-app will always take
				precedence (i.e. when you edit that character in the beta version, the changes will be lost)
			</span>
		</div>

		<ul class="list bg-base-100 card card-border shadow-sm">
			<li class="p-4 pb-2 text-xs tracking-wide opacity-60">Characters</li>

			{#each data.characters as { id, name, description, system, updated_at } (id)}
				<li class="list-row items-center gap-2 p-1 md:gap-4 md:p-2">
					<a
						href="{base}/beta/character/{id}"
						aria-label="Open {name}"
						data-sveltekit-preload-data="off"
						class="focus:bg-base-200 hover:bg-base-200 rounded-box col-span-3 grid grid-cols-subgrid items-center p-1 align-middle transition md:p-2"
					>
						<div class="avatar avatar-placeholder">
							<div class="bg-neutral text-neutral-content size-10 rounded-full">
								<span>
									{name
										.split(' ')
										.map((p) => p.charAt(0))
										.join('')}
								</span>
							</div>
						</div>
						<div class="list-col-grow overflow-hidden">
							<div class="min-w-0 truncate">{name}</div>
							<div class="min-w-0 truncate text-xs font-semibold uppercase opacity-60">
								{description}
							</div>
						</div>
						<div class="flex flex-col items-end justify-center">
							<div class="badge badge-xs badge-soft badge-neutral uppercase">{system}</div>
							<div class="text-right text-xs font-semibold uppercase opacity-60">
								{updated_at.toLocaleDateString()}
							</div>
							<div class="text-right text-xs font-semibold uppercase opacity-60">
								{updated_at.toLocaleTimeString()}
							</div>
						</div>
					</a>
					<button
						class="btn btn-square btn-outline btn-warning pointer-events-auto m-1 md:m-2"
						onclick={(e) => {
							e.preventDefault();
							deleteChar(id);
						}}
						aria-label="Delete"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="size-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
							/>
						</svg>
					</button>
				</li>
			{/each}
		</ul>

		<button onclick={() => createChar()} class="btn btn-primary">New Character</button>

		<div class="flex flex-row gap-2">
			<label class="form-control w-full">
				<input
					type="file"
					bind:files
					accept=".json, application/json"
					class="file-input file-input-bordered w-full"
				/>
			</label>
			<button class="btn btn-secondary" disabled={!validInputFile} onclick={importChar}>
				Import
			</button>
		</div>
	</div>
</div>
