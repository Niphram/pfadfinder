<script lang="ts">
	import { base } from '$app/paths';
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

<article class="prose mx-auto p-4 select-text">
	<p>
		&lt;
		<a href="{base}/">Back to home</a>
	</p>

	{@render heading('h1', 'privacy-policy', 'Privacy Policy')}

	This policy sets out the different areas where user privacy is concerned and outlines the
	obligations & requirements of the users, the website and website owner. Furthermore the way this
	website processes, stores and protects user data and information will also be detailed within this
	policy.

	{@render heading('h2', 'tldr', 'TLDR')}

	<ul>
		<li>The website owner doesn't have access to any of your saved characters.</li>
		<li>Local storage is used where necessary.</li>
		<li>The site is hosted by GitHub Pages.</li>
	</ul>

	{@render heading('h2', 'github-pages', 'Hosting: Github Pages')}

	<p>
		This website is hosted on GitHub Pages. The website owner does not have access to data collected
		by the host. GitHub may collect User Personal Information as noted here:
	</p>

	<blockquote
		class="pr-8 text-justify"
		cite="https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#data-collection"
	>
		<p>
			When a GitHub Pages site is visited, the visitor's IP address is logged and stored for
			security purposes, regardless of whether the visitor has signed into GitHub or not. For more
			information about GitHub's security practices, see <a
				class="link"
				href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
			>
				GitHub Privacy Statement
			</a>
			.
		</p>

		<cite>
			~ source:
			<a
				href="https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#data-collection"
			>
				Github Pages Docs
			</a>
		</cite>
	</blockquote>

	{@render heading('h2', 'local-storage', 'Local Storage')}

	<p>
		This website uses the browser's local storage to save data entered by the user (i.e. characters
		and settings). This data is not available to the website owner, or sent to any third parties.
	</p>

	{@render heading('h2', 'external-links', 'External links')}

	<p>
		This website contains links to external sites. If you follow these links, you should become
		aware of their terms of service.
	</p>

	<p>
		External links will be marked <a class="external-link" href="#external-links">like this</a>
	</p>

	<p>The external sites are:</p>

	<ul>
		<li>GitHub for documentation and source code repositories.</li>
	</ul>
</article>
