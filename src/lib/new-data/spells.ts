import { autoserializeAs } from 'cerialize';

export class Spell {}

export class SpellList {
	@autoserializeAs(Spell)
	cantrips: Spell[] = [];

	@autoserializeAs(Spell)
	level1: Spell[] = [];

	@autoserializeAs(Spell)
	level2: Spell[] = [];

	@autoserializeAs(Spell)
	level3: Spell[] = [];

	@autoserializeAs(Spell)
	level4: Spell[] = [];

	@autoserializeAs(Spell)
	level5: Spell[] = [];

	@autoserializeAs(Spell)
	level6: Spell[] = [];

	@autoserializeAs(Spell)
	level7: Spell[] = [];

	@autoserializeAs(Spell)
	level8: Spell[] = [];

	@autoserializeAs(Spell)
	level9: Spell[] = [];
}
