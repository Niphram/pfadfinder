<script lang="ts">
	import type { PageProps } from './$types';

	import { resolve } from '$app/paths';

	const { data }: PageProps = $props();

	type License = {
		name: string;
		license: string | null;
		licenseText: string | null;
		noticeText?: string | null;
		homepage: string | null;
		version?: string | null;
	};

	const LICENSES: License[] = $derived(
		[
			{
				name: 'Heropatterns',
				license: 'CC BY 4.0',
				licenseText: '"Wiggle" by Steve Schoger, licensed under CC BY 4.0',
				homepage: 'https://heropatterns.com/',
			},
			...data.licenses.map((l) => ({
				name: l.name!,
				version: l.version,
				license: l.license,
				licenseText: l.licenseText,
				noticeText: l.noticeText,
				homepage: l.homepage,
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
					{#if l.homepage}
						<a
							onclick={(e) => e.stopPropagation()}
							class="z-1 ml-auto text-sm"
							href={l.homepage}
							rel="external"
							target="_blank"
						>
							Homepage
						</a>
					{/if}
				</div>
				<div class="collapse-content text-sm">
					{#if l.license}
						<p>License: {l.license}</p>
					{/if}
					{#if l.noticeText}
						<p>{l.noticeText}</p>
					{/if}
					{#if l.licenseText}
						<p>{l.licenseText}</p>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</article>
