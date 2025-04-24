<script lang="ts">
	import { base } from '$app/paths';

	let { children } = $props();
</script>

<div class="flex min-h-screen flex-col items-stretch gap-4">
	<div class="flex grow flex-col gap-4">
		<!-- HEADER -->
		<div id="header" class="bg-base-200 sticky top-0 z-40 flex w-full flex-col drop-shadow-xl">
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
		class="footer sm:footer-horizontal bg-neutral text-neutral-content items-center gap-y-4 p-4"
	>
		<aside class="grid-flow-col items-center">
			<p>&copy; Niphram - All rights reserved</p>
		</aside>
		<nav class="grid-flow-col gap-4 sm:justify-self-end">
			<a href="{base}/changelog" class="link">Changelog</a>
			<a href="{base}/privacy" class="link">Privacy Policy</a>
			<a href="https://github.com/Niphram/pfadfinder" class="link">Github</a>
		</nav>
	</footer>
</div>
