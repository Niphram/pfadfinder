import { autoserialize, autoserializeAs, inheritSerialization } from 'cerialize';
import { nanoid } from 'nanoid';

import { VersionedCharacter, type CharacterMigrationFn } from '../versioned-character';

export const FATE_CONDENSED_CHAR_MIGRATIONS: CharacterMigrationFn[] = [];

export const SHOW_OPTIONS = ['never', 'always', 'auto'] as const;
export type ShowOption = (typeof SHOW_OPTIONS)[number];

export class Skill {
	id = nanoid();

	@autoserialize
	name;

	@autoserialize
	bonus = 0;

	constructor(name: string) {
		this.name = name;
	}
}

@inheritSerialization(VersionedCharacter)
export class FateCondensedCharacter extends VersionedCharacter {
	constructor() {
		super('fate-condensed', FATE_CONDENSED_CHAR_MIGRATIONS.length);
	}

	@autoserialize
	pronouns = '';

	@autoserialize
	high_concept = '';
	@autoserialize
	trouble = '';
	@autoserialize
	relationship = '';
	@autoserialize
	other_aspect_1 = '';
	@autoserialize
	other_aspect_2 = '';

	@autoserialize
	physical_stress = 0;
	@autoserialize
	mental_stress = 0;

	@autoserialize
	mild_consequence = '';
	@autoserialize
	mild_consequence_extra = '';
	@autoserialize
	moderate_consequence = '';
	@autoserialize
	severe_consequence = '';

	@autoserialize
	show_additional_consequence: ShowOption = 'auto';

	@autoserialize
	physical_stress_skill = 'Physique';

	@autoserialize
	physical_stress_base = 3;

	get physical_stress_max() {
		const skill = this.skills.find(({ name }) => name === this.physical_stress_skill);
		return this.physical_stress_base + Math.min(3, Math.ceil((skill?.bonus || 0) / 2));
	}

	@autoserialize
	mental_stress_skill = 'Will';

	@autoserialize
	mental_stress_base = 3;

	get mental_stress_max() {
		const skill = this.skills.find(({ name }) => name === this.mental_stress_skill);
		return this.mental_stress_base + Math.min(3, Math.ceil((skill?.bonus || 0) / 2));
	}

	@autoserialize
	stunts = '';

	@autoserializeAs(Skill)
	skills = [
		new Skill('Academics'),
		new Skill('Athletics'),
		new Skill('Burglary'),
		new Skill('Contacts'),
		new Skill('Crafts'),
		new Skill('Deceive'),
		new Skill('Drive'),
		new Skill('Empathy'),
		new Skill('Fight'),
		new Skill('Investigate'),
		new Skill('Lore'),
		new Skill('Notice'),
		new Skill('Physique'),
		new Skill('Provoke'),
		new Skill('Rapport'),
		new Skill('Resources'),
		new Skill('Shoot'),
		new Skill('Stealth'),
		new Skill('Will')
	];

	@autoserialize
	refresh = 3;

	@autoserialize
	fate_points = 0;
}
