<script lang="ts">
	import type { PageProps } from './$types';

	import { asset, resolve } from '$app/paths';

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
		} else if (repo && !/^http(s)?:/.test(repo)) {
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
			{
				name: 'daisyUI',
				license: 'MIT',
				licenseText: `MIT License

Copyright (c) 2020 Pouya Saadeghi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`,
				links: {
					Homepage: 'https://daisyui.com/',
				},
			},
			{
				name: 'tailwindcss',
				license: 'MIT',
				licenseText: `MIT License

Copyright (c) Tailwind Labs, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`,
				links: {
					Homepage: 'https://tailwindcss.com/',
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

<article class="mx-auto prose w-full max-w-2xl p-4 select-text">
	<p>
		&lt;
		<a href={resolve('/')}>Back to home</a>
	</p>

	{@render heading('h1', 'oss-licenses', 'Open-source licenses')}

	<p>This list contains projects which are included in this website.</p>

	<noscript>
		<div class="mb-8 alert alert-info">
			<span>
				JavaScript is disabled in this browser, so the full list could not be
				loaded. <a href={asset('/oss-licenses.json')}
					>Click here to view the full file.</a
				>
			</span>
		</div>
	</noscript>

	<div class="flex flex-col gap-2">
		{#each LICENSES as l (l.name)}
			<div class="collapse-arrow collapse bg-base-200">
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
							{#if href}
								<a
									onclick={(e) => e.stopPropagation()}
									{href}
									rel="external"
									target="_blank"
								>
									{label}
								</a>
							{/if}
						{/each}
					</span>
				</div>
				<div class="collapse-content text-sm">
					<p>License: {l.license}</p>
					{#each l.licenseText.split('\n\n') as line, i (i)}
						<p>{line}</p>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</article>
