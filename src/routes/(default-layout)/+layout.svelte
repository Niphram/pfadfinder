<script lang="ts">
	import { resolve } from '$app/paths';

	let { children } = $props();

	$inspect($effect.pending());
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
			<svelte:boundary>
				{#snippet pending()}
					<div
						class={[
							'fixed top-0 right-0 bottom-0 left-0 grid grow place-items-center items-center ',
							'opacity-100 transition-all delay-500 duration-200',
							'starting:opacity-0',
						]}
					>
						<span class="loading w-32 loading-bars"></span>
					</div>
				{/snippet}

				<div
					class={[
						'h-full w-full scale-100 transition-all duration-100',
						'starting:scale-75 starting:opacity-0',
					]}
				>
					{@render children()}
				</div>
			</svelte:boundary>
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
