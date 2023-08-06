import type { PickProps } from '$lib/utils/utilTypes';
import { idbWritable } from './idb-store';
import { abilityKeys, type AbilityKey, type SaveKey, saveKeys } from './types';

function makeObject<Keys extends string, T>(keys: readonly Keys[], valueFac: (key: Keys) => T) {
	return keys.reduce((obj, key) => {
		obj[key] = valueFac(key);
		return obj;
	}, {} as Record<Keys, T>);
}

function abilityObject<T>(valueFac: (key: AbilityKey) => T) {
	return makeObject(abilityKeys, valueFac);
}

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
	ranks: number;
	ranksMisc: number;
};

class Character {
	/**
	 * General
	 */
	public name = 'Unnamed Character';

	/**
	 * Hitpoints
	 */
	public readonly hp = {
		max: 8,
		current: 8,
		temp: 0
	};

	/**
	 * Initiative
	 */
	public initMisc = 0;
	public get init() {
		return this.abilities.dex.mod + this.initMisc;
	}

	/**
	 * Abilities
	 */
	public readonly abilities = (() => {
		const char = this;

		return abilityObject((key) => ({
			base: 10,
			temp: 0,
			get total() {
				return this.base + char.race.abilities[key] + this.temp;
			},
			get mod() {
				return Math.floor(this.total / 2) - 5;
			},
			notes: ''
		}));
	})();

	/**
	 * Saves
	 */
	public saves = (() => {
		const char = this;

		function make(ability: AbilityKey, classMod: SaveKey) {
			return {
				ability,
				misc: 0,
				tempMod: 0,
				get totalMod() {
					return (
						char.classes[classMod] + char.abilities[this.ability].mod + this.misc + this.tempMod
					);
				}
			};
		}

		return {
			fort: make('con', 'fort'),
			ref: make('dex', 'ref'),
			will: make('wis', 'will')
		};
	})();

	/**
	 * Armor Class
	 */
	public ac = (() => {
		const char = this;

		return {
			primaryAbility: 'dex' as AbilityKey,
			secondaryAbility: undefined as undefined | AbilityKey,

			get abilityMod() {
				return (
					char.abilities[this.primaryAbility].mod +
					(this.secondaryAbility ? char.abilities[this.secondaryAbility].mod : 0)
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
		};
	})();

	/**
	 * Attacks
	 */
	public attacks = (() => {
		const char = this;

		return {
			cmbAbility: 'str' as AbilityKey,
			meeleeAbility: 'str' as AbilityKey,
			rangedAbility: 'dex' as AbilityKey,

			get bab() {
				return char.classes.bab;
			},
			get sr() {
				// ToDo
				return -1;
			},
			get cmb() {
				// ToDo
				return -1;
			},
			get cmd() {
				// ToDo
				return -1;
			}
		};
	})();

	/**
	 * Race
	 */
	public race = (() => {
		return {
			name: 'Unknown Race',
			abilities: abilityObject(() => 0),
			speed: 30
		};
	})();

	/**
	 * Classes
	 */
	public classes = (() => {
		const char = this;

		function sum<T extends object>(classes: T[], key: keyof PickProps<T, number>) {
			return classes.reduce((sum, c) => sum + c[key], 0);
		}

		return {
			classes: [] as Class[],

			get totalLevel() {
				return sum(this.classes, 'level');
			},

			get totalSpeed() {
				return sum(this.classes, 'speed');
			},

			get bab() {
				return sum(this.classes, 'bab');
			},

			get fort() {
				return sum(this.classes, 'fort');
			},

			get ref() {
				return sum(this.classes, 'ref');
			},

			get will() {
				return sum(this.classes, 'will');
			},

			get totalSkillRanks() {
				return this.classes.reduce(
					(sum, c) => sum + (c.ranks + char.abilities.int.mod) * c.level + c.ranksMisc,
					0
				);
			}
		};
	})();
}

export const { data: c, dirty, loaded } = idbWritable('character', () => new Character());
