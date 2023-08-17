import { autoserialize, autoserializeAs } from 'cerialize';
import { Derive } from '../macros';

type Level = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export class Spell {
	@autoserialize
	name = 'Unnamed Spell';

	@autoserialize
	prepared = 0;
}

export class SpellLevel {
	@autoserialize
	known = 0;

	@autoserialize
	perDay = 0;

	@autoserialize
	perDayBonus = 0;

	@autoserialize
	dcBonus = 0;

	readonly dc = new Derive((c) => 10 + this.level + c.spells[this.level].known);

	readonly totalPerDay = new Derive(
		(c) => c.spells[this.level].perDay + c.spells[this.level].perDayBonus
	);

	@autoserializeAs(Spell)
	spells: Spell[] = [];

	constructor(private level: Level) {}
}

export class Spells {
	@autoserializeAs(SpellLevel)
	0 = new SpellLevel(0);

	@autoserializeAs(SpellLevel)
	1 = new SpellLevel(1);

	@autoserializeAs(SpellLevel)
	2 = new SpellLevel(2);

	@autoserializeAs(SpellLevel)
	3 = new SpellLevel(3);

	@autoserializeAs(SpellLevel)
	4 = new SpellLevel(4);

	@autoserializeAs(SpellLevel)
	5 = new SpellLevel(5);

	@autoserializeAs(SpellLevel)
	6 = new SpellLevel(6);

	@autoserializeAs(SpellLevel)
	7 = new SpellLevel(7);

	@autoserializeAs(SpellLevel)
	8 = new SpellLevel(8);

	@autoserializeAs(SpellLevel)
	9 = new SpellLevel(9);
}
