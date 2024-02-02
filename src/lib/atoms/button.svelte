<script lang="ts" context="module">
	const button = cva('btn', {
		variants: {
			color: {
				neutral: 'btn-neutral',
				primary: 'btn-primary',
				secondary: 'btn-secondary',
				accent: 'btn-accent',
				info: 'btn-info',
				success: 'btn-success',
				warning: 'btn-warning',
				error: 'btn-error'
			},
			style: {
				ghost: 'btn-ghost',
				link: 'btn-link',
				outline: 'btn-outline'
			},
			size: {
				xs: 'btn-xs',
				sm: 'btn-sm',
				md: 'btn-md',
				lg: 'btn-lg'
			},
			wide: {
				true: 'btn-wide'
			}
		}
	});
</script>

<script lang="ts">
	import { cva, type VariantProps } from 'cva';

	interface $$Props
		extends Partial<Omit<HTMLButtonElement, keyof VariantProps<typeof button>>>,
			VariantProps<typeof button> {}

	let className: string | undefined = undefined;
	export { className as class };

	export let color: $$Props['color'] = undefined;
	export let style: $$Props['style'] = undefined;
	export let size: $$Props['size'] = undefined;
	export let wide: $$Props['wide'] = undefined;
</script>

<button
	{...$$restProps}
	class={button({ color, style, size, wide, className })}
	on:click
	on:contextmenu
>
	<slot />
</button>
