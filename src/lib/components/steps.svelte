<script lang="ts" context="module">
	// Needed to satisfy eslint
	type T = unknown;
</script>

<script lang="ts" generics="T">
	export let steps: T[];

	export let currentStep = 0;

	function previous() {
		currentStep > 0 && currentStep--;
	}

	function next() {
		currentStep < steps.length - 1 && currentStep++;
	}
</script>

<slot props={steps[currentStep]} {previous} {next} />
