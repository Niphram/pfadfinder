<script lang="ts">
	import type { ClassValue } from 'svelte/elements';
	import Fieldset from './fieldset.svelte';

	export let checked: boolean;

	export let name: string;
	export let label: string | undefined = undefined;

	export let classname: ClassValue | undefined = undefined;

	export let disabled: boolean = false;
</script>

<Fieldset legend={label} class={classname}>
	<input {name} type="checkbox" bind:checked class="checkbox checkbox-xl" on:change {disabled} />
</Fieldset>
