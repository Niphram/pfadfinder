<script lang="ts">
	import '../app.css';

	import ThemeChanger from '$lib/components/theme-changer.svelte';
	import { setChar } from '$lib/data/context';
	import { c, dirty, loaded, overwriteSave, p } from '$lib/data';

	// Global character while migrating all the logic
	setChar(c, p, dirty, loaded, overwriteSave);
</script>

<ThemeChanger>
	<slot />
</ThemeChanger>
