import { mapSum } from '$lib/utils';
import { autoserializeAs } from 'cerialize';
import { SKILL_KEYS } from './keys';
import { SkillList } from './skills';
import { Coins } from './coins';
import { Settings } from './settings';
import { Ability } from './ability';

export class Character {
	// Strength
	@autoserializeAs(Ability)
	str = new Ability();

	// Dexterity
	@autoserializeAs(Ability)
	dex = new Ability();

	// Constitution
	@autoserializeAs(Ability)
	con = new Ability();

	// Intelligence
	@autoserializeAs(Ability)
	int = new Ability();

	// Wisdom
	@autoserializeAs(Ability)
	wis = new Ability();

	// Charisma
	@autoserializeAs(Ability)
	cha = new Ability();

	@autoserializeAs(SkillList)
	skills = new SkillList();

	get totalSkillRanks() {
		return mapSum(SKILL_KEYS, (key) => mapSum(this.skills[key], (skill) => skill.ranks));
	}

	@autoserializeAs(Coins)
	coins = new Coins();

	@autoserializeAs(Settings)
	settings = new Settings();

	get weight() {
		return this.settings.coinWeight ? this.coins.weight : 0;
	}
}

const pfoglobals_abilities = [
	'strength',
	'dexterity',
	'constitution',
	'intelligence',
	'wisdom',
	'charisma'
];
const pfoglobals_abilities_fields = [
	'strength_base',
	'strength_race',
	'strength_bonus',
	'strength_condition',
	'dexterity_base',
	'dexterity_race',
	'dexterity_bonus',
	'dexterity_condition',
	'constitution_base',
	'constitution_race',
	'constitution_bonus',
	'intelligence_base',
	'intelligence_race',
	'intelligence_bonus',
	'wisdom_base',
	'wisdom_race',
	'wisdom_bonus',
	'charisma_base',
	'charisma_race',
	'charisma_bonus'
];
const pfoglobals_mods = [
	'strength_mod',
	'dexterity_mod',
	'constitution_mod',
	'intelligence_mod',
	'wisdom_mod',
	'charisma_mod',
	'strength_base_mod',
	'dexterity_base_mod',
	'constitution_base_mod',
	'intelligence_base_mod',
	'wisdom_base_mod',
	'charisma_base_mod',
	'none_mod'
];
const pfoglobals_flex_abilities = [
	'fortitude_ability',
	'reflex_ability',
	'will_ability',
	'cmb_ability',
	'melee_ability',
	'ranged_ability',
	'acrobatics_ability',
	'appraise_ability',
	'bluff_ability',
	'climb_ability',
	'craft_ability',
	'diplomacy_ability',
	'disable_device_ability',
	'disguise_ability',
	'escape_artist_ability',
	'fly_ability',
	'handle_animal_ability',
	'heal_ability',
	'intimidate_ability',
	'knowledge_arcana_ability',
	'knowledge_dungeoneering_ability',
	'knowledge_engineering_ability',
	'knowledge_geography_ability',
	'knowledge_history_ability',
	'knowledge_local_ability',
	'knowledge_nature_ability',
	'knowledge_nobility_ability',
	'knowledge_planes_ability',
	'knowledge_religion_ability',
	'linguistics_ability',
	'perception_ability',
	'perform_ability',
	'profession_ability',
	'ride_ability',
	'sense_motive_ability',
	'sleight_of_hand_ability',
	'spellcraft_ability',
	'stealth_ability',
	'survival_ability',
	'swim_ability',
	'use_magic_device_ability',
	'caster1_ability',
	'caster2_ability'
];
const pfoglobals_initiative_fields = [
	'npc',
	'dexterity_mod',
	'initiative_misc',
	'initiative_bonus'
];
const pfoglobals_ac_ability_fields = [
	'npc',
	'ac_ability_primary',
	'ac_ability_secondary',
	'ac_condition_nobonus',
	'ac_ability_mod',
	'encumbrance_ability_maximum',
	'ac_ability_maximum',
	'ac_secab_monk'
].concat(pfoglobals_mods);
const pfoglobals_ac_fields = [
	'npc',
	'ac_bonus',
	'ac_ability_mod',
	'ac_armor',
	'ac_shield',
	'ac_size',
	'ac_misc',
	'ac_touch_items',
	'ac_flatfooted_items',
	'ac_natural_items',
	'ac_deflection_items',
	'ac_dodge_items',
	'ac_armor_bonus',
	'ac_shield_bonus',
	'ac_natural_bonus',
	'ac_deflection_bonus',
	'ac_dodge_bonus',
	'ac_noflatflooted',
	'ac_touchshield',
	'ac_condition',
	'ac_secab_monk',
	'ac_ff_ability_mod'
];
const pfoglobals_save_attr = ['base', 'ability', 'ability_mod', 'misc', 'bonus'];
const pfoglobals_save_fields = [
	'fortitude_base',
	'fortitude_ability',
	'fortitude_ability_mod',
	'fortitude_misc',
	'fortitude_bonus',
	'reflex_base',
	'reflex_ability',
	'reflex_ability_mod',
	'reflex_misc',
	'reflex_bonus',
	'will_base',
	'will_ability',
	'will_ability_mod',
	'will_misc',
	'will_bonus'
].concat(pfoglobals_mods);
const pfoglobals_babs_fields = [
	'npc',
	'bab',
	'bab_multi',
	'bab_size',
	'cmb_size',
	'cmb_ability',
	'cmb_ability_mod',
	'cmb_misc',
	'cmb_bonus',
	'melee_ability',
	'melee_ability_mod',
	'melee_misc',
	'melee_bonus',
	'ranged_ability',
	'ranged_ability_mod',
	'ranged_misc',
	'ranged_bonus',
	'ac_ability_mod',
	'ac_dodge_bonus',
	'ac_dodge_items',
	'ac_deflection_bonus',
	'ac_deflection_items',
	'cmd_misc',
	'cmd_bonus',
	'cmd_condition',
	'ac_condition_nobonus',
	'class1_name',
	'class2_name',
	'class3_name',
	'class1_bab',
	'class2_bab',
	'class3_bab',
	'class1_level',
	'class2_level',
	'class3_level'
].concat(pfoglobals_mods);
const pfoglobals_skill_list = [
	'acrobatics',
	'appraise',
	'bluff',
	'climb',
	'craft',
	'diplomacy',
	'disable_device',
	'disguise',
	'escape_artist',
	'fly',
	'handle_animal',
	'heal',
	'intimidate',
	'knowledge_arcana',
	'knowledge_dungeoneering',
	'knowledge_engineering',
	'knowledge_geography',
	'knowledge_history',
	'knowledge_local',
	'knowledge_nature',
	'knowledge_nobility',
	'knowledge_planes',
	'knowledge_religion',
	'linguistics',
	'perception',
	'perform',
	'profession',
	'ride',
	'sense_motive',
	'sleight_of_hand',
	'spellcraft',
	'stealth',
	'survival',
	'swim',
	'use_magic_device'
];
const pfoglobals_skill_attr = [
	'classkill',
	'ability',
	'ability_mod',
	'ranks',
	'misc',
	'bonus',
	'armor_penalty'
];
const pfoglobals_skill_fields = [
	'skill_check_penalty',
	'armor_check_penalty',
	'encumbrance_check_penalty'
].concat(pfoglobals_mods);
const pfoglobals_skillranks_fields = [
	'intelligence_mod',
	'class1_skillranks_misc',
	'class1_skillranks_base',
	'class2_skillranks_misc',
	'class2_skillranks_base',
	'class3_skillranks_misc',
	'class3_skillranks_base',
	'class1_level',
	'class2_level',
	'class3_level'
];
var pfoglobals_repsec_skills = [
	{ section: 'skillcraft', attrs: pfoglobals_skill_attr },
	{ section: 'skillknowledge', attrs: pfoglobals_skill_attr },
	{ section: 'skillperform', attrs: pfoglobals_skill_attr },
	{ section: 'skillprofession', attrs: pfoglobals_skill_attr },
	{ section: 'skillcustom', attrs: pfoglobals_skill_attr }
];
const pfoglobals_atk_attr = [
	'atkname',
	'atkflag',
	'atktype',
	'atktype2',
	'atkmod',
	'atkvs',
	'atkrange',
	'atkcritrange',
	'dmgflag',
	'dmgbase',
	'dmgattr',
	'dmgmod',
	'dmgcritmulti',
	'dmgtype',
	'dmgbonusdice',
	'dmg2flag',
	'dmg2name',
	'dmg2base',
	'dmg2attr',
	'dmg2mod',
	'dmg2critmulti',
	'dmg2type',
	'dmg2bonusdice',
	'descflag',
	'atkdesc',
	'notes',
	'atkextra1flag',
	'atkextra1name',
	'atkextra1critrange',
	'atkextra1type',
	'atkextra1type2',
	'atkextra1mod',
	'atkextra1dmgbase',
	'atkextra1dmgattr',
	'atkextra1dmgmod',
	'atkextra1dmgtype',
	'atkextra1dmgcritmulti',
	'atkextra2flag',
	'atkextra2name',
	'atkextra2critrange',
	'atkextra2type',
	'atkextra2type2',
	'atkextra2mod',
	'atkextra2dmgbase',
	'atkextra2dmgattr',
	'atkextra2dmgmod',
	'atkextra2dmgtype',
	'atkextra2dmgcritmulti',
	'atkextra3flag',
	'atkextra3name',
	'atkextra3critrange',
	'atkextra3type',
	'atkextra3type2',
	'atkextra3mod',
	'atkextra3dmgbase',
	'atkextra3dmgattr',
	'atkextra3dmgmod',
	'atkextra3dmgtype',
	'atkextra3dmgcritmulti'
];
var pfoglobals_repsec_atk = [{ section: 'attacks', attrs: pfoglobals_atk_attr }];
const pfoglobals_atk_fields = [
	'npc',
	'strength_oneandahalf_mod',
	'strength_half_mod',
	'dexterity_oneandahalf_mod',
	'dexterity_half_mod',
	'melee_mod',
	'ranged_mod',
	'cmb_mod',
	'bab',
	'bab_max',
	'fob',
	'rollnotes_attack',
	'whispertype',
	'rollshowchar',
	'bab_multi',
	'melee_multi',
	'ranged_multi',
	'cmb_multi',
	'fob_multi',
	'attack_bonus',
	'damage_bonus',
	'melee_damage_bonus',
	'ranged_damage_bonus'
].concat(pfoglobals_mods);
const pfoglobals_abilities_attr = ['perday', 'perday_max', 'perday_qty'];
const pfoglobals_repsec_traits = [{ section: 'abilities', attrs: pfoglobals_abilities_attr }];
const pfoglobals_spell_attr = [
	'spelllevel',
	'spellcaster',
	'spellname',
	'spellschool',
	'spellclasslevel',
	'spellcastingtime',
	'spellrange',
	'spellarea',
	'spelltargets',
	'spelleffect',
	'spellduration',
	'spellsaveflag',
	'spellsave',
	'spelldc_mod',
	'spellresistanceflag',
	'spellresistance',
	'spellatkflag',
	'spellatktype',
	'spellatkmod',
	'spellatkcritrange',
	'spelldmgcritmulti',
	'spelldmgflag',
	'spelldmg',
	'spelldmgtype',
	'spelldmg2flag',
	'spelldmg2name',
	'spelldmg2',
	'spelldmg2type',
	'spelldescflag',
	'spelldesc',
	'notes'
];
const pfoglobals_spell_only_attr = ['spellcomponent'];
const pfoglobals_spell_like_attr = ['spelltype', 'timesperday', 'perday_max', 'perday_qty'];
var pfoglobals_repsec_spell = [];
const pfoglobals_spell_fields = [
	'melee_mod',
	'ranged_mod',
	'cmb_mod',
	'rollnotes_spell',
	'whispertype',
	'rollshowchar',
	'caster1_level',
	'caster2_level',
	'caster1_flag',
	'caster2_flag',
	'caster1_class',
	'caster2_class',
	'armor_spell_failure',
	'caster1_spell_failure',
	'caster2_spell_failure',
	'npc',
	'caster1_concentration_roll',
	'caster2_concentration_roll',
	'caster1_dc_level_0',
	'caster1_dc_level_1',
	'caster1_dc_level_2',
	'caster1_dc_level_3',
	'caster1_dc_level_4',
	'caster1_dc_level_5',
	'caster1_dc_level_6',
	'caster1_dc_level_7',
	'caster1_dc_level_8',
	'caster1_dc_level_9',
	'caster2_dc_level_0',
	'caster2_dc_level_1',
	'caster2_dc_level_2',
	'caster2_dc_level_3',
	'caster2_dc_level_4',
	'caster2_dc_level_5',
	'caster2_dc_level_6',
	'caster2_dc_level_7',
	'caster2_dc_level_8',
	'caster2_dc_level_9'
].concat(pfoglobals_mods);
const pfoglobals_concentration_fields = [
	'npc',
	'caster1_level',
	'caster1_ability',
	'caster1_ability_mod',
	'caster1_concentration_misc',
	'caster1_concentration_bonus',
	'caster2_level',
	'caster2_ability',
	'caster2_ability_mod',
	'caster2_concentration_misc',
	'caster2_concentration_bonus'
].concat(pfoglobals_mods);
const pfoglobals_spells_dc_fields = [
	'npc',
	'caster1_ability',
	'caster1_ability_mod',
	'caster1_dc_misc',
	'caster1_dcbonus_level_0',
	'caster1_dcbonus_level_1',
	'caster1_dcbonus_level_2',
	'caster1_dcbonus_level_3',
	'caster1_dcbonus_level_4',
	'caster1_dcbonus_level_5',
	'caster1_dcbonus_level_6',
	'caster1_dcbonus_level_7',
	'caster1_dcbonus_level_8',
	'caster1_dcbonus_level_9',
	'caster2_ability',
	'caster2_ability_mod',
	'caster2_dc_misc',
	'caster2_dcbonus_level_0',
	'caster2_dcbonus_level_1',
	'caster2_dcbonus_level_2',
	'caster2_dcbonus_level_3',
	'caster2_dcbonus_level_4',
	'caster2_dcbonus_level_5',
	'caster2_dcbonus_level_6',
	'caster2_dcbonus_level_7',
	'caster2_dcbonus_level_8',
	'caster2_dcbonus_level_9'
].concat(pfoglobals_mods);
const pfoglobals_size = [
	{ size: 'fine', atkac: 8, cmb: -8, fly: 8, stealth: 16, load: 0.125, squares: 0.5 },
	{ size: 'diminutive', atkac: 4, cmb: -4, fly: 6, stealth: 12, load: 0.25, squares: 0.5 },
	{ size: 'tiny', atkac: 2, cmb: -2, fly: 4, stealth: 8, load: 0.5, squares: 0.5 },
	{ size: 'small', atkac: 1, cmb: -1, fly: 2, stealth: 4, load: 0.75, squares: 0.75 },
	{ size: 'medium', atkac: 0, cmb: 0, fly: 0, stealth: 0, load: 1, squares: 1.0 },
	{ size: 'large', atkac: -1, cmb: 1, fly: -2, stealth: -4, load: 2, squares: 2.0 },
	{ size: 'huge', atkac: -2, cmb: 2, fly: -4, stealth: -8, load: 4, squares: 3.0 },
	{ size: 'gargantuan', atkac: -4, cmb: 4, fly: -6, stealth: -12, load: 8, squares: 4.0 },
	{ size: 'colossal', atkac: -8, cmb: 8, fly: -8, stealth: -16, load: 16, squares: 4.0 }
];
const pfoglobals_encumbrance_fields = [
	'npc',
	'encumbrance_load_bonus',
	'encumbrance_load_multiplier',
	'strength',
	'encumbrance_size',
	'encumbrance_gear_weight',
	'encumbrance_load_light',
	'encumbrance_load_medium',
	'encumbrance_load_heavy',
	'speed_race',
	'speed_class',
	'encumbrance',
	'encumbrance_display'
];
const pfoglobals_speed_fields = [
	'speed_race',
	'speed_class',
	'encumbrance',
	'speed_notmodified',
	'speed_encumbrance',
	'speed_armor',
	'encumbrance_run_factor',
	'armor_run_factor',
	'speed_base',
	'speed_bonus',
	'speed_run_factor',
	'speed_condition_multiplier',
	'speed_condition_norun',
	'speed_condition_nospeed',
	'speed_climb_misc',
	'speed_climb_bonus',
	'speed_swim_misc',
	'speed_swim_bonus'
];
const pfoglobals_conditions = [
	'condition_bleed',
	'condition_blinded',
	'condition_confused',
	'condition_cowering',
	'condition_dazed',
	'condition_dazzled',
	'condition_deafened',
	'condition_disabled',
	'condition_dying',
	'condition_energy_drained',
	'condition_entangled',
	'condition_exhausted',
	'condition_fascinated',
	'condition_fatigued',
	'condition_flat-footed',
	'condition_frightened',
	'condition_grappled',
	'condition_helpless',
	'condition_incorporeal',
	'condition_invisible',
	'condition_nauseated',
	'condition_panicked',
	'condition_paralyzed',
	'condition_petrified',
	'condition_pinned',
	'condition_prone',
	'condition_shaken',
	'condition_sickened',
	'condition_stable',
	'condition_staggered',
	'condition_stunned',
	'condition_unconscious'
];
const pfoglobals_buff_attr = ['name', 'toggle', 'mods'];
var pfoglobals_repsec_buff = [{ section: 'buff', attrs: pfoglobals_buff_attr }];
const pfoglobals_allrepsecs = [
	'npcatk-melee',
	'npcatk-ranged',
	'npcatk-special',
	'feats',
	'abilities',
	'buff',
	'attacks',
	'skillcraft',
	'skillknowledge',
	'skillperform',
	'skillprofession',
	'skillcustom',
	'acitems',
	'gear',
	'feats',
	'abilities',
	'spell-0',
	'spell-1',
	'spell-2',
	'spell-3',
	'spell-4',
	'spell-5',
	'spell-6',
	'spell-7',
	'spell-8',
	'spell-9',
	'spell-like',
	'metamagic'
];
