<script>
	import Holes from './components/holes.svelte';
</script>

<div class="h-screen w-screen print:block">
	<div class="flex flex-row">
		<div class="fixed left-0 align-middle">
			<Holes holePattern="FiloFaxA5" />
		</div>
		<div class="grid grid-cols-12">
			<div class="col-span-6 col-start-1 border">Hi</div>
		</div>
	</div>
</div>
