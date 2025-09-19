<script lang="ts">
	import type { ClassValue } from 'svelte/elements';

	const COLORS = {
		neutral: 'status-neutral',
		primary: 'status-primary',
		secondary: 'status-secondary',
		accent: 'status-accent',
		info: 'status-info',
		success: 'status-success',
		warning: 'status-warning',
		error: 'status-error',
	} as const;

	const SIZES = {
		xs: 'status-xs',
		sm: 'status-sm',
		md: 'status-md',
		lg: 'status-lg',
		xl: 'status-xl',
	} as const;

	type Props = {
		class?: ClassValue;
		statusClass?: ClassValue;

		color?: keyof typeof COLORS;
		size?: keyof typeof SIZES;

		ping?: boolean;
	};

	const { class: className, statusClass, color, size, ping }: Props = $props();
</script>

<div class={['inline-grid *:[grid-area:1/1]', className]}>
	{#if ping}
		<div
			class={[
				'status animate-ping',
				color && COLORS[color],
				size && SIZES[size],
				statusClass,
			]}
		></div>
	{/if}
	<div
		class={['status', color && COLORS[color], size && SIZES[size], statusClass]}
	></div>
</div>
