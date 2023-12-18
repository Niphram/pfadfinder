<script lang="ts">
	const COLORS = {
		default: '',
		neutral: 'btn-neutral',
		primary: 'btn-primary',
		secondary: 'btn-secondary',
		accent: 'btn-accent',
		info: 'btn-info',
		success: 'btn-success',
		warning: 'btn-warning',
		error: 'btn-error'
	};

	const STYLES = {
		default: '',
		ghost: 'btn-ghost',
		link: 'btn-link',
		outline: 'btn-outline'
	};

	let className: string = '';
	export { className as class };

	export let color: keyof typeof COLORS = 'default';
	export let style: keyof typeof STYLES = 'default';
</script>

<button class="btn {COLORS[color]} {STYLES[style]} {className}" on:click on:contextmenu>
	<slot />
</button>
