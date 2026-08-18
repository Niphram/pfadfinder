<script lang="ts">
	// This is literally just to troll my friend who broke his phone.
	// Click/tap 10 times in 2.5 seconds to show a pink line down the screen.

	let shown = $state(false);

	let counter = $state(0);
	let timeout: number = $state(0);

	function clickCount() {
		if (!timeout) {
			timeout = window.setTimeout(() => {
				counter = 0;
				timeout = 0;
			}, 2500);
		}

		counter++;

		if (counter === 10) {
			shown = !shown;
		}
	}
</script>

<svelte:body on:click={clickCount}></svelte:body>

{#if shown}
	<div
		class="pointer-events-none fixed top-0 bottom-0 left-3/4 z-50 w-1 bg-[#ff00ff]"
	></div>
{/if}
