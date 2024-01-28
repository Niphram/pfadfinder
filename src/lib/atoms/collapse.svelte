<script lang="ts">
	export let open = false;

	export let icon: 'arrow' | 'plus' | undefined;

	function toggleOpen() {
		open = !open;
	}

	function keydownHandler(event: KeyboardEvent) {
		if (event.code === 'Space') {
			event.preventDefault();
		} else if (event.code === 'Enter') {
			event.preventDefault();
			toggleOpen();
		}
	}

	function keyupHandler(event: KeyboardEvent) {
		if (event.code === 'Space') {
			event.preventDefault();
			toggleOpen();
		}
	}
</script>

<div
	class="collapse bg-base-200"
	class:collapse-arrow={icon === 'arrow'}
	class:collapse-plus={icon === 'plus'}
	class:collapse-open={open}
	class:collapse-close={!open}
	tabindex="0"
	role="button"
	on:click={toggleOpen}
	on:contextmenu|preventDefault
	on:keydown={keydownHandler}
	on:keyup={keyupHandler}
>
	{#if $$slots.title}
		<div class="collapse-title h-min min-h-0 py-2 md:py-4">
			<slot name="title" />
		</div>
	{/if}

	<div class="collapse-content">
		<slot />
	</div>
</div>

<style>
	.collapse-arrow > .collapse-title::after {
		top: 50%;
	}
</style>
