<script lang="ts">
	import type { PageProps } from './$types';

	import { resolve } from '$app/paths';

	const { data }: PageProps = $props();

	type License = {
		name: string;
		license: string;
		licenseText: string;
		version?: string;
		links: Record<string, string>;
	};

	// parse repository
	function repositoryToHref(repo: string) {
		if (repo.startsWith('git+')) {
			return repo.replace('git+', '');
		} else if (repo.startsWith('git:')) {
			return repo.replace('git:', 'https:');
		} else if (!/^http(s)?:/.test(repo)) {
			// Assume github, if no absolute url was given
			return `https://github.com/${repo}`;
		}

		return repo;
	}

	const LICENSES: License[] = $derived(
		[
			{
				name: 'Heropatterns',
				license: 'CC BY 4.0',
				licenseText: '"Wiggle" by Steve Schoger, licensed under CC BY 4.0',
				links: {
					Homepage: 'https://heropatterns.com/',
				},
			},
			...data.licenses.map((l) => ({
				name: l.name,
				version: l.version,
				license: l.license,
				licenseText: l.licenseText,
				links: {
					Repository: repositoryToHref(l.repository),
				},
			})),
		].sort((a, b) => a.name.localeCompare(b.name)),
	);
</script>

{#snippet heading(type: 'h1' | 'h2' | 'h3', id: string, content: string)}
	<svelte:element this={type} {id}>
		<a aria-hidden="true" tabindex="-1" href="#{id}">
			<span
				class="relative -mt-1 mr-1 inline-block align-middle text-base font-bold opacity-20 hover:opacity-60"
			>
				#
			</span>
		</a>
		{content}
	</svelte:element>
{/snippet}

<svelte:head>
	<title>Open-source licenses - Pfadfinder</title>
</svelte:head>

<article class="prose mx-auto w-full max-w-2xl p-4 select-text">
	<p>
		&lt;
		<a href={resolve('/')}>Back to home</a>
	</p>

	{@render heading('h1', 'oss-licenses', 'Open-source licenses')}

	<div class="flex flex-col gap-2">
		{#each LICENSES as l (l.name)}
			<div class="collapse-arrow bg-base-200 collapse">
				<input type="checkbox" />

				<div
					class="collapse-title flex w-full flex-row items-center gap-2 font-semibold"
				>
					<span class="font-bold">{l.name}</span>
					{#if l.version}
						<span class="text-sm">{l.version}</span>
					{/if}
					<span class="z-1 ml-auto flex flex-row gap-2 text-sm">
						{#each Object.entries(l.links) as [label, href] (label)}
							<a
								onclick={(e) => e.stopPropagation()}
								{href}
								rel="external"
								target="_blank"
							>
								{label}
							</a>
						{/each}
					</span>
				</div>
				<div class="collapse-content text-sm">
					<p>License: {l.license}</p>
					<p>{l.licenseText}</p>
				</div>
			</div>
		{/each}
	</div>
</article>
