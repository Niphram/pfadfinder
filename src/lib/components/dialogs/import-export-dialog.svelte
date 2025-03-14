<script lang="ts">
	import { Character } from '$lib/data';
	import { DeserializeInto, Serialize } from 'cerialize';
	import { title } from '../dialog.svelte';
	import Steps from '../steps.svelte';
	import { getChar } from '$lib/data/context';

	const { c, overwriteSave } = getChar();

	$title = 'Import/Export';

	function download() {
		const file = new File([JSON.stringify(Serialize($c))], `${$c.name}.json`, {
			type: 'application/json'
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

	let files: FileList | null;
	$: validInputFile = files?.length === 1 && files[0].type === 'application/json';

	async function importFromFIle() {
		if (files?.length !== 1) {
			return alert('No file selected!');
		}

		try {
			const file = files[0];

			const fileContent = await file.text();

			const newChar = new Character();
			DeserializeInto(JSON.parse(fileContent), Character, newChar);

			await overwriteSave(newChar);

			location.reload();
		} catch (_err) {
			alert('Could not import character!');
		}
	}
</script>

<div class="flex flex-col gap-4">
	<p>This software might be unstable so it is recommended to regularly backup your character.</p>

	<div class="divider">Export</div>

	<p>Download the character as a file</p>

	<button class="btn btn-info w-full" on:click|preventDefault={download}> Export </button>

	<div class="divider">Import</div>

	<p>Load character from file. This will replace the current character.</p>

	<label class="form-control w-full">
		<input
			type="file"
			bind:files
			accept=".json, application/json"
			class="file-input file-input-bordered w-full"
		/>
	</label>

	<Steps
		steps={[
			{ label: 'Import', style: { warning: true } },
			{
				label: 'This will overwrite the current character!',
				style: { error: true },
				onClick: importFromFIle
			}
		]}
		let:props={{ label, onClick, style }}
		let:next
	>
		<button
			class="btn w-full"
			class:btn-warning={style.warning}
			class:btn-error={style.error}
			class:btn-disabled={!validInputFile}
			disabled={!validInputFile}
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
