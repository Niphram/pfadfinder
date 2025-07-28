<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { MouseEventHandler } from 'svelte/elements';

	const COLORS = {
		default: '',
		neutral: 'btn-neutral',
		primary: 'btn-primary',
		secondary: 'btn-secondary',
		accent: 'btn-accent',
		info: 'btn-info',
		success: 'btn-success',
		warning: 'btn-warning',
		error: 'btn-error',
	};

	const STYLES = {
		default: '',
		ghost: 'btn-ghost',
		link: 'btn-link',
		outline: 'btn-outline',
	};

	const SIZES = {
		default: '',
		xs: 'btn-xs',
		sm: 'btn-sm',
	};

	interface Props {
		class?: string;
		color?: keyof typeof COLORS;
		style?: keyof typeof STYLES;
		size?: keyof typeof SIZES;
		onclick?: MouseEventHandler<HTMLButtonElement>;
		oncontextmenu?: MouseEventHandler<HTMLButtonElement>;
		children?: Snippet;
	}

	let {
		class: className = '',
		color = 'default',
		style = 'default',
		size = 'default',
		onclick,
		oncontextmenu,
		children,
	}: Props = $props();
</script>

<button
	class="btn {COLORS[color]} {STYLES[style]} {SIZES[size]} {className}"
	{onclick}
	{oncontextmenu}
>
	{@render children?.()}
</button>
