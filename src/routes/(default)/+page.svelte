<script lang="ts">
	import { nanoid } from 'nanoid';

	import { base } from '$app/paths';

	import { Character } from '$lib/data';
	import { upgradeCharacterAndDeserialize } from '$lib/data/upgrade';
	import { preventDefault } from '$lib/utils';

	import { SERIALIZE_SYMBOL } from '$lib/serde/interfaces';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
	const { characters, db } = data;

	async function createChar() {
		const char = new Character();
		await db.saveCharacter(char);
	}

	async function deleteChar(id: string) {
		await db.deleteCharacter(id);
	}

	async function duplicateChar(id: string) {
		await db.duplicateCharacterById(id);
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

			const newChar = upgradeCharacterAndDeserialize(JSON.parse(fileContent));
			newChar.id.value = nanoid();

			await db.saveCharacter(newChar);
			files = undefined;
		} catch (_err) {
			alert('Could not import character!');
		}
	}

	async function exportChar(id: string) {
		const char = await db.getCharacterById(id);

		if (!char) return;

		const file = new File([JSON.stringify(char[SERIALIZE_SYMBOL]())], `${char.name.value}.json`, {
			type: 'application/json',
		});

		const link = document.createElement('a');
		const url = URL.createObjectURL(file);

		link.href = url;
		link.download = file.name;
		document.body.appendChild(link);
		link.click();

		document.body.removeChild(link);
		window.URL.revokeObjectURL(url);
	}

	let characterModal = $state<HTMLDialogElement>();
	let selectedCharacter = $state('');

	function openCharacterDialog(id: string) {
		selectedCharacter = id;
		characterModal?.showModal();
	}
</script>

<dialog bind:this={characterModal} class="modal">
	<div class="modal-box">
		<form method="dialog" class="modal-backdrop">
			<div class="flex flex-col gap-4">
				<h3 class="text-primary-content text-lg font-bold">Character options</h3>

				<button class="btn btn-secondary" onclick={() => duplicateChar(selectedCharacter)}>
					Copy
				</button>
				<button class="btn btn-secondary" onclick={() => exportChar(selectedCharacter)}>
					Export
				</button>
				<button
					class="btn btn-warning"
					onclick={() => confirm('Are you sure?') && deleteChar(selectedCharacter)}
				>
					Delete
				</button>
			</div>
		</form>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>

<div class="flex w-full justify-center">
	<div class="flex w-full max-w-3xl flex-col gap-4">
		<ul class="list bg-base-100 card card-border shadow-sm">
			<li class="p-4 pb-2 text-xs tracking-wide opacity-60">Characters</li>

			{#each $characters as { id, name, description, system, updated_at } (id)}
				<li class="p-2">
					<a
						href="{base}/character/{id}"
						aria-label="Open {name}"
						data-sveltekit-preload-data="off"
						class="list-row hover:bg-base-200 rounded-box col-span-3 items-center p-2 align-middle transition"
						oncontextmenu={preventDefault(() => openCharacterDialog(id))}
					>
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
