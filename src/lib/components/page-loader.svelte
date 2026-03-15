<script lang="ts">
	type Props = {
		loading?: boolean;
	};

	const { loading }: Props = $props();
</script>

<div
	class={[
		'pointer-events-none invisible fixed top-0 left-0 z-999 grid  h-full w-full items-center justify-items-center bg-transparent opacity-0 transition-opacity delay-300 duration-500',
		loading && 'pointer-events-auto! visible! bg-black/40! opacity-100!',
	]}
>
	<span class="loading w-32 loading-bars"></span>
</div>
