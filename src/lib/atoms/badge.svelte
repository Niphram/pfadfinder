<script lang="ts" context="module">
	const badge = cva('badge', {
		variants: {
			color: {
				neutral: 'badge-neutral',
				primary: 'badge-primary',
				secondary: 'badge-secondary',
				accent: 'badge-accent',
				info: 'badge-info',
				success: 'badge-success',
				warning: 'badge-warning',
				error: 'badge-error'
			},
			style: {
				ghost: 'badge-ghost',
				link: 'badge-link',
				outline: 'badge-outline'
			},
			size: {
				xs: 'badge-xs',
				sm: 'badge-sm',
				md: 'badge-md',
				lg: 'badge-lg'
			},
			test: {
				true: ''
			}
		}
	});
</script>

<script lang="ts">
	import { cva, type VariantProps } from 'cva';

	interface $$Props extends VariantProps<typeof badge> {}

	let className: string | undefined = undefined;
	export { className as class };

	export let color: $$Props['color'] = undefined;
	export let style: $$Props['style'] = undefined;
	export let size: $$Props['size'] = undefined;
</script>

<span {...$$restProps} class={badge({ color, style, size, className })}>
	<slot />
</span>
