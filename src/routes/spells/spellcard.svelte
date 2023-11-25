<script lang="ts">
	import { fitText } from '$lib/actions/fit-text';
	import { t } from '$lib/i18n';
	import { CLASSES_KEYS, type ISpell } from '$lib/pathfinder-data/spells';
	import LabelledP from './labelled-p.svelte';

	export let spell: ISpell;

	const school =
		spell.school +
		(spell.subschool ? ` (${spell.subschool})` : '') +
		(spell.descriptor ? ` [${spell.descriptor}]` : '');
	const level = CLASSES_KEYS.filter((key) => spell.classes[key] !== undefined).map((key) => ({
		c: key,
		l: spell.classes[key]
	}));
</script>

<div class="flex h-[3.5in] w-[2.5in] flex-col rounded-md border bg-red-500 p-1 pt-0 text-[6pt]">
	<div class="h-5 w-full text-center" use:fitText={{ maxSize: 16 }}>{spell.name}</div>
	<div class="w-full rounded-sm border bg-white p-1 leading-tight">
		<LabelledP label="School" content={school} />
		<LabelledP
			label="Level"
			content={level.map(({ l, c }) => `${$t(`classes.${c}`)} ${l}`).join(', ')}
		/>
		<LabelledP label="Casting Time" content={spell.casting_time} />
		<LabelledP label="Components" content={spell.components} />
		<LabelledP label="Range" content={spell.range} />
		<LabelledP label="Targets" content={spell.targets} />
		<LabelledP label="Duration" content={spell.duration} />
		<div class="flex flex-row gap-1">
			<LabelledP label="Saving Throw" content={spell.saving_throw} />
			<LabelledP label="SR" content={spell.spell_resistance} />
		</div>
	</div>

	<div class="h-min w-full bg-red-500 py-[2px] text-[6pt]">Description</div>

	<div use:fitText={{ maxSize: 8 }} class="h-full min-h-0 rounded-sm bg-white p-1 text-justify">
		{@html spell.description_formatted}
	</div>
</div>
