<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { base } from '$app/paths';
	import { Character } from '$lib/data';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();

	async function createChar() {
		const char = new Character();
		await data.db.saveCharacter(char);
		invalidate('idb:characters');
	}
</script>

<div class="flex justify-center">
	<div class="flex w-3xl flex-col">
		<h1>In Development</h1>

		<button onclick={() => createChar()} class="btn btn-primary">New Character</button>

		<ul class="list bg-base-100 rounded-box p-4 shadow-xl">
			<li class="p-4 pb-2 text-xs tracking-wide opacity-60">Characters</li>

			{#each data.characters as { id, name, description, system, updated_at } (id)}
				<li>
					<a
						href="{base}/#/beta/character/{id}"
						aria-label="Open {name}"
						data-sveltekit-preload-data="off"
						class="list-row hover:bg-base-200 transition"
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
						<div class="list-col-grow">
							<div>{name}</div>
							<div class="text-xs font-semibold uppercase opacity-60">
								{description}
							</div>
						</div>
						<div class="flex flex-col items-end justify-center">
							<div class="badge badge-xs badge-soft badge-neutral uppercase">{system}</div>
							<div
								class="flex flex-col justify-end text-right text-xs font-semibold uppercase opacity-60"
							>
								{updated_at.toLocaleString()}
							</div>
						</div>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</div>
