<script lang="ts">
	import { resolve } from '$app/paths';

	let { children } = $props();
</script>

<div class="flex min-h-dvh flex-col items-stretch gap-4">
	<div class="flex grow flex-col gap-4">
		<!-- HEADER -->
		<div
			id="header"
			class="sticky top-0 z-40 flex w-full flex-col bg-base-200 drop-shadow-xl"
		>
			<div class="flex flex-row items-center gap-2 p-2">
				<p class="text-lg font-bold">Pfadfinder</p>
			</div>
		</div>

		<!-- Content -->
		<div class="flex grow flex-col items-center px-2 md:px-4">
			{@render children()}
		</div>
	</div>

	<!-- Footer -->
	<footer
		class="footer items-center gap-y-4 bg-neutral p-4 text-neutral-content sm:footer-horizontal"
	>
		<aside class="grid-flow-col items-center">
			<p>&copy; Niphram - All rights reserved</p>
		</aside>
		<nav class="grid-flow-col gap-4 sm:justify-self-end">
			<a href={resolve('/changelog')} class="link">Changelog</a>
			<a href={resolve('/privacy')} class="link">Privacy Policy</a>
			<a href={resolve('/licenses')} class="link">Licenses</a>
			<a href="https://github.com/Niphram/pfadfinder" class="link">Github</a>
		</nav>
	</footer>
</div>
