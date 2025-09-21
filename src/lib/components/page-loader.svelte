<script lang="ts">
	type Props = {
		loading?: boolean;
	};

	const { loading }: Props = $props();
</script>

<div
	class={[
		'fixed top-0 right-0 z-[999] h-full w-full overflow-hidden',
		'bg-transparent transition-opacity delay-300 duration-500',
		'grid items-center justify-items-center',
		'pointer-events-none invisible opacity-0',
		loading && 'pointer-events-auto! visible! bg-black/40! opacity-100!',
	]}
>
	<span class="loading loading-bars w-32"></span>
</div>
