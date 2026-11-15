<script lang="ts">
	import { t } from '#lib/i18n/index.ts';

	import Divider from '#lib/atoms/divider.svelte';
	import InputWrapper from '#lib/atoms/input-wrapper.svelte';

	import {
		selectedTheme,
		THEME_KEYS,
	} from '#lib/components/theme-changer.svelte';
</script>

<div>
	<Divider>Appearance</Divider>

	<InputWrapper legend="Theme">
		<select
			name="theme"
			class={['select w-full appearance-none']}
			bind:value={$selectedTheme}
		>
			<option value={null}>{$t('ui.theme.auto')}</option>
			<option disabled>-----</option>
			{#each THEME_KEYS as key (key)}
				<option value={key}>{$t(`ui.theme.${key}`)}</option>
			{/each}
		</select>
	</InputWrapper>
</div>
