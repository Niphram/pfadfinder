<script lang="ts">
	import type { Writable } from 'svelte/store';

	import { openDialog } from '$lib/components/dialog.svelte';
	import Divider from '$lib/preview/atoms/divider.svelte';
	import Header from '$lib/preview/atoms/header.svelte';
	import TextArea from '$lib/preview/atoms/text-area.svelte';
	import { t } from '$lib/preview/i18n';
	import { withSign } from '$lib/preview/utils/format';

	import { type FateCondensedCharacter } from './character';
	import StressMeter from './components/stress-meter.svelte';
	import NameDialog from './dialogs/name-dialog.svelte';
	import SkillConfigDialog from './dialogs/skill-config-dialog.svelte';
	import VitalsDialog from './dialogs/vitals-dialog.svelte';
	import TextInput from '$lib/preview/atoms/text-input.svelte';

	export let c: Writable<FateCondensedCharacter>;

	$: invalid_vitals =
		($c.physical_stress_skill && !$c.skills.find((s) => s.name === $c.physical_stress_skill)) ||
		($c.mental_stress_skill && !$c.skills.find((s) => s.name === $c.mental_stress_skill));

	$: show_additional_consequence = {
		never: false,
		always: true,
		auto: $c.physical_stress_max > 5 || $c.mental_stress_max > 5
	}[$c.show_additional_consequence];
</script>

<div class="flex flex-col items-stretch">
	<Header>
		<button class="btn btn-ghost btn-sm" on:click={() => openDialog(NameDialog, { c })}>
			<span class="text-lg">{$c.name || $t('general.character.unnamed_character')}</span>
			{#if $c.pronouns}
				<span>({$c.pronouns})</span>
			{/if}
		</button>
	</Header>

	<div class="flex w-full flex-col gap-2 self-center p-4 md:max-w-6xl md:flex-row">
		<div class="flex flex-grow flex-col gap-2">
			<div class="flex flex-col">
				<Divider>{$t('fate_condensed.aspects')}</Divider>

				<TextInput
					name="high_concept"
					label={$t('fate_condensed.high_concept')}
					bind:value={$c.high_concept}
					small
				/>

				<TextInput
					name="trouble"
					label={$t('fate_condensed.trouble')}
					bind:value={$c.trouble}
					small
				/>

				<TextInput
					name="relationship"
					label={$t('fate_condensed.relationship')}
					bind:value={$c.relationship}
					small
				/>

				<TextInput
					name="other_ascpect_1"
					label={$t('fate_condensed.other_aspect')}
					bind:value={$c.other_aspect_1}
					small
				/>

				<TextInput
					name="other_ascpect_2"
					label={$t('fate_condensed.other_aspect')}
					bind:value={$c.other_aspect_2}
					small
				/>
			</div>

			<div class="flex flex-col gap-2">
				<Divider>
					{$t('fate_condensed.vitals')}
					<button
						class="btn btn-outline btn-xs"
						class:btn-error={invalid_vitals}
						on:click={() => openDialog(VitalsDialog, { c })}
					>
						{$t('general.ui.config')}
						{#if invalid_vitals}
							<span class="uppercase">
								({$t('general.ui.invalid')})
							</span>
						{/if}
					</button>
				</Divider>

				<div class="flex flex-col items-center justify-center">
					<table class="m-0 w-min border-separate border-spacing-2 p-0 align-middle">
						<tr>
							<td class="m-0 p-0 text-right">
								<button
									on:click={() => ($c.physical_stress = 0)}
									class="btn btn-ghost btn-md h-auto min-h-0 w-min p-2 text-end"
								>
									{$t('fate_condensed.physical')}
								</button>
							</td>
							<td class="m-0 p-0">
								<div class="flex flex-row align-middle">
									<StressMeter bind:value={$c.physical_stress} max={$c.physical_stress_max} />
								</div>
							</td>
						</tr>
						<tr>
							<td class="m-0 p-0 text-right">
								<button
									on:click={() => ($c.mental_stress = 0)}
									class="btn btn-ghost btn-md h-auto min-h-0 w-min p-2 text-end"
								>
									{$t('fate_condensed.mental')}
								</button>
							</td>
							<td class="m-0 p-0">
								<div class="flex flex-row align-middle">
									<StressMeter bind:value={$c.mental_stress} max={$c.mental_stress_max} />
								</div>
							</td>
						</tr>
					</table>

					<TextInput
						name="mild_consequence"
						label={$t('fate_condensed.mild_consequence')}
						bind:value={$c.mild_consequence}
						small
					/>
					{#if show_additional_consequence}
						<TextInput
							name="mild_consequence_extra"
							label={$t('fate_condensed.mild_consequence')}
							bind:value={$c.mild_consequence_extra}
							small
						/>
					{/if}
					<TextInput
						name="moderate_consequence"
						label={$t('fate_condensed.moderate_consequence')}
						bind:value={$c.moderate_consequence}
						small
					/>
					<TextInput
						name="severe_consequence"
						label={$t('fate_condensed.severe_consequence')}
						bind:value={$c.severe_consequence}
						small
					/>
				</div>
			</div>

			<div class="flex flex-col gap-2">
				<Divider>{$t('fate_condensed.stunts')}</Divider>

				<TextArea resize="vertical" name="stunts" rows={10} bind:value={$c.stunts} />
			</div>
		</div>

		<div class="divider divider-horizontal hidden md:flex" />

		<div class="flex flex-grow flex-col gap-2">
			<Divider>
				{$t('fate_condensed.skills')}
				<button class="btn btn-outline btn-xs" on:click={() => openDialog(SkillConfigDialog, { c })}
					>{$t('general.ui.config')}</button
				>
			</Divider>

			{#each $c.skills as { id, name, bonus } (id)}
				<button class="btn btn-ghost join btn-sm flex flex-row justify-stretch gap-1 p-0">
					<span
						class="join-item flex flex-auto items-center justify-center bg-base-200 pl-16 text-center text-base-content"
					>
						{name || $t('fate_condensed.unnamed_skill')}
					</span>
					<span
						class="join-item flex w-16 items-center justify-center bg-accent text-accent-content"
					>
						{withSign(bonus)}
					</span>
				</button>
			{/each}
		</div>
	</div>
</div>
