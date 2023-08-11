import { openDialog } from '$lib/components/dialog.svelte';
import ErrorDialog from '$lib/components/dialogs/error-dialog.svelte';
import type { Paths } from '$lib/utils';
import { idbWritable } from './idb-store';
import { abilityKeys, saveKeys, type AbilityKey, type SizeKey } from './types';

function makeObject<Keys extends string, T>(keys: readonly Keys[], valueFac: (key: Keys) => T) {
	return keys.reduce((obj, key) => {
		obj[key] = valueFac(key);
		return obj;
	}, {} as Record<Keys, T>);
}

function sum<T>(arr: T[], cb: (v: T) => number) {
	return arr.reduce((sum, v) => sum + cb(v), 0);
}

const defaultSaveAbility = {
	fort: 'con',
	ref: 'dex',
	will: 'wis'
} as const;

const sizeModifiers: Record<SizeKey, { mod: number; ability: AbilityKey }> = {
	fine: { ability: 'dex', mod: -8 },
	diminutive: { ability: 'dex', mod: -4 },
	tiny: { ability: 'dex', mod: -2 },
	small: { ability: 'str', mod: -1 },
	medium: { ability: 'str', mod: 0 },
	large: { ability: 'str', mod: 1 },
	huge: { ability: 'str', mod: +2 },
	gargantuan: { ability: 'str', mod: +4 },
	colossal: { ability: 'str', mod: +8 }
};

export type Class = {
	name: string;
	favored: boolean;
	level: number;
	hitDice: number;
	bab: number;
	fort: number;
	ref: number;
	will: number;
	speed: number;
	levelRanks: number;
	miscRanks: number;
};

function makeDefaultCharacter() {
	const char = {
		name: 'Unnamed Character',

		// Hit Points
		hp: {
			max: 8,
			current: 8,
			temp: 0
		},

		// Initiative
		init: {
			misc: 0,
			notes: '',
			get mod() {
				return char.dex.mod + this.misc;
			}
		},

		// Race
		race: {
			name: 'Unknown Race',
			speed: 30,
			size: 'medium' as SizeKey,
			...makeObject(abilityKeys, () => 0)
		},

		// Abilities
		...makeObject(abilityKeys, (key) => ({
			base: 10,
			bonus: 0,
			notes: '',
			get total() {
				return this.base + char.race[key] + this.bonus;
			},
			get mod() {
				return Math.floor(this.total / 2) - 5;
			}
		})),

		// Saves
		...makeObject(saveKeys, (key) => ({
			ability: defaultSaveAbility[key],
			bonus: 0,
			misc: 0,
			notes: '',
			get mod() {
				return char.classes[key] + char[this.ability].mod + this.bonus + this.misc;
			}
		})),

		// Armor Class
		ac: {
			primaryAbility: 'dex' as AbilityKey,
			secondaryAbility: undefined as undefined | AbilityKey,
			get abilityMod() {
				return (
					char[this.primaryAbility].mod +
					(this.secondaryAbility ? char[this.secondaryAbility].mod : 0)
				);
			},
			get total() {
				return 10 + this.abilityMod;
			},
			get touch() {
				return 10 + this.abilityMod;
			},
			get flatFooted() {
				return 10;
			}
		},

		// Combat
		combat: {
			cmbAbility: 'str' as AbilityKey,
			meeleeAbility: 'str' as AbilityKey,
			rangedAbility: 'dex' as AbilityKey,

			sr: {
				base: 0,
				misc: 0,
				notes: '',
				get total() {
					return this.base + this.misc;
				}
			},

			bab: {
				notes: '',
				get mod() {
					return char.classes.bab;
				}
			},

			cmb: {
				notes: '',
				get mod() {
					const { ability, mod } = sizeModifiers[char.race.size];
					// BAB + STR/DEX + SizeMod
					return char.combat.bab.mod + char[ability].mod + mod;
				}
			},

			cmd: {
				notes: '',
				get mod() {
					return (
						10 +
						char.combat.bab.mod +
						char.str.mod +
						char.dex.mod +
						sizeModifiers[char.race.size].mod
					);
				}
			}
		},

		// Classes
		classes: {
			list: [] as Class[],

			get levels() {
				return sum(this.list, (c) => c.level);
			},
			get speed() {
				return sum(this.list, (c) => c.speed);
			},
			get bab() {
				return sum(this.list, (c) => c.bab);
			},
			get fort() {
				return sum(this.list, (c) => c.fort);
			},
			get ref() {
				return sum(this.list, (c) => c.ref);
			},
			get will() {
				return sum(this.list, (c) => c.will);
			},
			get ranks() {
				return sum(this.list, (c) => (c.levelRanks + char.int.mod) * c.level + c.miscRanks);
			}
		}
	};

	return char;
}

export type ICharacter = ReturnType<typeof makeDefaultCharacter>;

export type CharPaths = Paths<ICharacter>;

export const {
	data: c,
	dirty,
	loaded
} = idbWritable('character', makeDefaultCharacter, {
	loadError: () =>
		openDialog(ErrorDialog, { message: 'There was an error while loading your character.' })
});

export function resetChar() {
	c.set(makeDefaultCharacter());
}
