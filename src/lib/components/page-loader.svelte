<script lang="ts">
	type Props = {
		loading?: boolean;
	};

	const { loading }: Props = $props();
</script>

{#if Math.random() < 0}
	<div class="fixed top-0 right-0 z-[999] h-screen w-screen overflow-hidden">
		<div
			class={[
				'h-full w-full',
				'bg-transparent transition-opacity delay-300 duration-500',
				'grid items-center justify-items-center',
				'pointer-events-none invisible opacity-0',
				loading && 'pointer-events-auto! visible! bg-black/40! opacity-100!',
			]}
		>
			<span class="loading loading-bars w-32"></span>
		</div>
	</div>
{/if}
