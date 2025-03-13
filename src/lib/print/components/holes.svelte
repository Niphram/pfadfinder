<script lang="ts">
	type HolePatterns = 'ISO838' | 'FiloFaxA5';

	type HolePatternProps = {
		margin: string;
		holeMargin: string;
		holeSize: string;
		holes: string[];
	};

	const holePatterns: Record<HolePatterns, HolePatternProps> = {
		FiloFaxA5: {
			margin: '1.5cm',
			holeMargin: '7.5mm',
			holeSize: '5mm',
			holes: ['-73mm', '-54mm', '-35mm', '35mm', '54mm', '73mm']
		},
		ISO838: {
			holeSize: '6mm',
			holeMargin: '12mm',
			margin: '25mm',
			holes: ['-40mm', '40mm']
		}
	};

	export let holePattern: HolePatterns = 'FiloFaxA5';

	$: pattern = holePatterns[holePattern];
</script>

<div class="flex h-full items-center" style="width: {pattern.margin};">
	<div class="relative flex h-0 justify-end" style="width: {pattern.holeMargin};">
		{#each pattern.holes as hole (hole)}
			<div
				class="absolute rounded-full border border-black"
				style="top: {hole}; width: {pattern.holeSize}; height: {pattern.holeSize}; transform: translate(50%, -50%);"
			></div>
		{/each}
	</div>
</div>
