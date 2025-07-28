<script lang="ts" generics="T">
	import type { Snippet } from 'svelte';

	interface Props {
		steps: T[];
		currentStep?: number;
		children?: Snippet<[{ props: T; previous: () => void; next: () => void }]>;
	}

	let { steps, currentStep = $bindable(0), children }: Props = $props();

	function previous() {
		currentStep > 0 && currentStep--;
	}

	function next() {
		currentStep < steps.length - 1 && currentStep++;
	}
</script>

{@render children?.({ props: steps[currentStep], previous, next })}
