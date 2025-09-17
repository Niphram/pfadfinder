function count(word: string, amount: number) {
	if (amount === 1) {
		return `${amount} ${word}`;
	} else {
		return `${amount} ${word}s`;
	}
}

export default {
	hp: {
		text: {
			heal: 'Heal',
			damage: 'Damage',
		},
	},
	abilities: {
		str: {
			full: 'Strength',
			short: 'str',
		},
		dex: {
			full: 'Dexterity',
			short: 'dex',
		},
		con: {
			full: 'Constitution',
			short: 'con',
		},
		int: {
			full: 'Intelligence',
			short: 'int',
		},
		wis: {
			full: 'Wisdom',
			short: 'wis',
		},
		cha: {
			full: 'Charisma',
			short: 'cha',
		},
	},
	saves: {
		fort: {
			full: 'Fortitude',
			short: 'fort',
		},
		ref: {
			full: 'Reflex',
			short: 'ref',
		},
		will: {
			full: 'Will',
			short: 'will',
		},
	},
	skills: {
		acrobatics: 'Acrobatics',
		appraise: 'Appraise',
		bluff: 'Bluff',
		climb: 'Climb',
		craft: 'Craft',
		diplomacy: 'Diplomacy',
		disableDevice: 'Disable Device',
		disguise: 'Disguise',
		escapeArtist: 'Escape Artist',
		fly: 'Fly',
		handleAnimal: 'Handle Animal',
		heal: 'Heal',
		intimidate: 'Intimidate',
		knowledgeArcana: 'Knowledge (arcana)',
		knowledgeDungeoneering: 'Knowledge (dungeoneering)',
		knowledgeEngineering: 'Knowledge (engineering)',
		knowledgeGeography: 'Knowledge (geography)',
		knowledgeHistory: 'Knowledge (history)',
		knowledgeLocal: 'Knowledge (local)',
		knowledgeNature: 'Knowledge (nature)',
		knowledgeNobility: 'Knowledge (nobility)',
		knowledgePlanes: 'Knowledge (planes)',
		knowledgeReligion: 'Knowledge (religion)',
		linguistics: 'Linguistics',
		perception: 'Perception',
		perform: 'Perform',
		profession: 'Profession',
		ride: 'Ride',
		senseMotive: 'Sense Motive',
		sleightOfHand: 'Sleight of Hand',
		spellcraft: 'Spellcraft',
		stealth: 'Stealth',
		survival: 'Survival',
		swim: 'Swim',
		useMagicDevice: 'Use Magic Device',
	},
	combat: {
		attackTypes: {
			meelee: 'Meelee (BAB+STR full attack)',
			ranged: 'Ranged (BAB+DEX full attack)',
			cmb: 'CMB (CMB single attack)',
			babFull: 'BAB Full (BAB full attack)',
			babMax: 'BAB Max (BAB single attack)',
			flurryOfBlows:
				'Flurry of Blows (No clue how to implement this, will be removed later)',
			none: 'None',
		},
	},
	equipment: {
		armorType: {
			light: 'Light',
			medium: 'Medium',
			heavy: 'Heavy',
			shield: 'Shield',
			misc: 'Misc',
		},
		acBonuses: {
			acBonus: {
				short: 'AC',
				full: 'AC Bonus',
			},
			ffBonus: {
				short: 'FF',
				full: 'Flat-Footed Bonus',
			},
			touchBonus: {
				short: 'TOU',
				full: 'Touch Bonus',
			},
			natBonus: {
				short: 'NAT',
				full: 'Natural Bonus',
			},
			defBonus: {
				short: 'DEF',
				full: 'Deflection Bonus',
			},
			dodBonus: {
				short: 'DOD',
				full: 'Dodge Bonus',
			},
		},
		penalties: {
			chkPenalty: {
				short: 'CHK',
				full: 'Check Penalty',
			},
			maxDexBonus: {
				short: 'DEX',
				full: 'Max Dex Bonus',
			},
			spellFailure: {
				short: 'SPL',
				full: 'Spell Failure',
			},
		},
		chargeType: {
			none: 'None',
			perDay: 'Per Day',
			total: 'Total',
		},
		items: (amount: number) => count('item', amount),
	},
	spell: {
		attackType: {
			touch: 'Touch',
			rangedTouch: 'Ranged Touch',
			cmb: 'CMB',
			str: 'Strength',
			dex: 'Dexterity',
			con: 'Constitution',
			wis: 'Wisom',
			int: 'Intelligence',
			cha: 'Charisma',
			none: '-',
		},
		slaType: {
			constant: 'Constant',
			atWill: 'At Will',
			perDay: 'Per Day',
		},
		level: {
			level_0: 'Cantrips',
			level_1: 'Level 1',
			level_2: 'Level 2',
			level_3: 'Level 3',
			level_4: 'Level 4',
			level_5: 'Level 5',
			level_6: 'Level 6',
			level_7: 'Level 7',
			level_8: 'Level 8',
			level_9: 'Level 9',
		},
	},
	texts: {
		pages: {
			abilities: 'Abilities',
			combat: 'Combat',
			character: 'Character',
			equipment: 'Equipment',
			spells: 'Spells',
			skills: 'Skills',
			features_traits: 'Features/Traits',
			persona: 'Persona',
		},
		general: {
			unsaved: 'unsaved',
			close: 'close',
		},
	},
	classes: {
		sor: 'Sorcerer',
		wiz: 'Wizard',
		cleric: 'Cleric',
		druid: 'Druid',
		ranger: 'Ranger',
		bard: 'Bard',
		paladin: 'Paladin',
		alchemist: 'Alchemist',
		summoner: 'Summoner',
		witch: 'Witch',
		inquisitor: 'Inquisitor',
		oracle: 'Oracle',
		antipaladin: 'Antipaladin',
		magus: 'Magus',
		adept: 'Adept',
		mythic: 'Mythic',
		bloodrager: 'Bloodrager',
		shaman: 'Shaman',
		psychic: 'Psychic',
		medium: 'Medium',
		mesmerist: 'Mesmerist',
		occultist: 'Occultist',
		spiritualist: 'Spiritualist',
		skald: 'Skald',
		investigator: 'Investigator',
		hunter: 'Hunter',
		summoner_unchained: 'Summoner Unchained',
	},
	feats: {
		type: {
			general: 'General',
			combat: 'Combat',
			critical: 'Critical',
			grit: 'Grit',
			item_creation: 'Item Creation',
			metamagic: 'Metamagic',
			panache: 'Panache',
			performance: 'Performance',
			style: 'Style',
			teamwork: 'Teamwork',
			misc: 'Misc',
		},
	},
	persona: {
		charm: 'Charm',
		genius: 'Genius',
		heroism: 'Heroism',
		sacrifice: 'Sacrifice',
		sagacity: 'Sagacity',
		subterfuge: 'Subterfuge',
	},
};
