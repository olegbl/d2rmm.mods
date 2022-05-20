if (D2RMM.getVersion == null || D2RMM.getVersion() < 1.4) {
  D2RMM.error('Requires D2RMM version 1.4 or higher.');
  return;
}

const isDamageReductionEnabled = config.damageReduction > 0;
const damageInArea = Math.max(1, Math.min(100, Math.round(config.damage)));

function getDamageReduction(chance) {
  const bonusDamageRatio = (damageInArea / 100) * (chance / 100);
  const totalDamageRatio = 1 + bonusDamageRatio;
  const normalDamageRatio = 1 / totalDamageRatio;
  const damageReduction = (1 - normalDamageRatio) * config.damageReduction;
  return Math.max(0, Math.round(damageReduction));
}

const itemstatcostFilename = 'global\\excel\\itemstatcost.txt';
const itemstatcost = D2RMM.readTsv(itemstatcostFilename);
let itemstatcostID = Math.max(...itemstatcost.rows.map((row) => row['*ID']));
itemstatcost.rows.push({
  Stat: 'item_meleeareadamage',
  '*ID': (itemstatcostID = itemstatcostID + 1),
  Signed: 1, // value is signed
  'Send Bits': 7, // number of bits used to represent the chance, 7 allows us to reach 100%
  'Send Param Bits': 16, // number of bits used to represent the skill, 16 allows all skills to be selected
  fCallback: 1, // based on item_skillonhit
  Add: 190, // item cost modifier
  Multiply: 256, // item cost multiplier
  '1.09-Save Bits': 21, // number of bits to reserve for this stat in the item
  '1.09-Save Add': 0, // maximum negative value that can be set
  'Save Bits': 7, // number of bits to reserve for this stat in the item
  'Save Add': 0, // maximum negative value that can be set
  'Save Param Bits': 16, // how many bits to reserve for this stat's parameter in the item
  damagerelated: 1,
  itemevent1: 'domeleedamage', // when melee damage is done
  itemeventfunc1: 20, // based on item_skillonhit
  descpriority: 200, // description priority (display earlier)
  descfunc: 19, // format as sprintf
  descstrpos: 'MeleeAreaDamage', // links with item-modifiers.json
  descstrneg: 'MeleeAreaDamage', // links with item-modifiers.json
  '*eol\r': 0,
});
itemstatcost.rows.forEach((row) => {
  const Stat =
    row.Stat === 'item_mindamage_percent'
      ? 'melee_mindamage_percent'
      : row.Stat === 'item_maxdamage_percent'
      ? 'melee_maxdamage_percent'
      : null;
  const descsstr =
    row.Stat === 'item_mindamage_percent'
      ? 'MeleeMinDamagePercent'
      : row.Stat === 'item_maxdamage_percent'
      ? 'MeleeMaxDamagePercent'
      : null;
  if (Stat != null) {
    itemstatcost.rows.push({
      ...row,
      // new name and id
      Stat,
      '*ID': (itemstatcostID = itemstatcostID + 1),
      // switch from op 13 to op 11 since the former doesn't work here for some reason
      // 11 - adds opstat.base * statvalue / 100 to the value of opstat
      // 13 - adds opstat.base * statvalue / 100 to the value of opstat, this is useable only on items
      // it will not apply the bonus to other unit types (this is why it is used for +% durability,
      // +% level requirement, +% damage, +% defense [etc]).
      op: 11,
      // unlike dmg%, we want to allow negative values, so we're going to increase the number of bits
      // used to save this state by a factor of 2 and then dedicate half of them to negative values
      'Send Bits': row['Send Bits'] * 2,
      '1.09-Save Bits': row['1.09-Save Bits'] * 2,
      'Save Bits': row['Save Bits'] * 2,
      '1.09-Save Add': 2 ** row['1.09-Save Bits'],
      'Save Add': 2 ** row['Save Bits'],
      // we want damage reduction to be able to be turned on and off at any time and allow
      // existing items to still work, so instead of removing the effect altogether, we keep
      // it on the item but make it not do anything and not show up visually in the label
      'op stat1': isDamageReductionEnabled ? row['op stat1'] : null,
      'op stat2': isDamageReductionEnabled ? row['op stat1'] : null,
      // unlike item_mindamage_percent / item_maxdamage_percent, we do not want to modify
      // item_throw_mindamage or item_throw_maxdamage because this skill will not apply to
      // thrown weapons' damage calculations
      'op stat3': null,
      // update description label
      descpriority: isDamageReductionEnabled ? row.descpriority : null,
      descfunc: isDamageReductionEnabled ? row.descfunc : null,
      descstrpos: isDamageReductionEnabled ? descsstr : null, // links with item-modifiers.json
      descstrneg: isDamageReductionEnabled ? descsstr : null, // links with item-modifiers.json
    });
  }
});
D2RMM.writeTsv(itemstatcostFilename, itemstatcost);

const propertiesFilename = 'global\\excel\\properties.txt';
const properties = D2RMM.readTsv(propertiesFilename);
properties.rows.push({
  code: 'dmg-meleearea',
  '*Enabled': 1,
  func1: 11, // event-based skills
  stat1: 'item_meleeareadamage', // linked with itemstatcost.txt
  '*Tooltip': '#% Chance of Melee Area Damage',
  '*Parameter': 'Skill',
  '*Min': '% Chance (If 0, then default to 5)',
  '*Max': 'Skill Level',
  '*eol\r': 0,
});
properties.rows.push({
  code: 'dmg%-melee-min',
  '*Enabled': 1,
  func1: 15, // min field
  stat1: 'melee_mindamage_percent', // linked with itemstatcost.txt
  '*Tooltip': '+#% Enhanced Minimum Melee Damage',
  '*Min': 'Min %',
  '*Max': 'Max %',
  '*eol\r': 0,
});
properties.rows.push({
  code: 'dmg%-melee-max',
  '*Enabled': 1,
  func1: 16, // max field
  stat1: 'melee_maxdamage_percent', // linked with itemstatcost.txt
  '*Tooltip': '+#% Enhanced Maximum Melee Damage',
  '*Min': 'Min %',
  '*Max': 'Max %',
  '*eol\r': 0,
});
D2RMM.writeTsv(propertiesFilename, properties);

if (config.scha || config.mcha || config.lcha) {
  const magicsuffixFilename = 'global\\excel\\magicsuffix.txt';
  const magicsuffix = D2RMM.readTsv(magicsuffixFilename);

  const group = Math.max(...magicsuffix.rows.map((row) => row.group)) + 1;

  [
    // multiple tiers of affixes
    { chance: 20, level: 1, levelreq: 1, frequency: 5 },
    { chance: 40, level: 10, levelreq: 5, frequency: 4 },
    { chance: 60, level: 20, levelreq: 15, frequency: 3 },
    { chance: 80, level: 30, levelreq: 25, frequency: 2 },
    { chance: 100, level: 40, levelreq: 35, frequency: 1 },
  ].forEach(({ chance, level, levelreq, frequency }) => {
    const itypes = [
      config.scha ? 'scha' : null,
      config.mcha ? 'mcha' : null,
      config.lcha ? 'lcha' : null,
    ]
      .filter((itype) => itype != null)
      .reduce(
        (agg, itype, index) => ({ ...agg, [`itype${index + 1}`]: itype }),
        {}
      );

    const damageReduction = getDamageReduction(chance);

    magicsuffix.rows.push({
      Name: 'of Melee Area Damage', // links with item-nameaffixes.json
      version: 1, // availabe in both Classic and LoD
      spawnable: 1, // can spawn
      rare: 1, // can appear on both magic and rare items
      level, // minimum item level for the affix to spawn
      levelreq, // minimum character level to use item with affix
      frequency, // frequency of affix appearing
      group, // group for deduplicating affixes (use some non-existant one)
      mod1code: 'dmg-meleearea', // links with properties.txt
      mod1param: 'Melee Area Damage', // links with skills.txt
      mod1min: chance, // % Chance (If 0, then default to 5)
      mod1max: 1, // Skill Level
      mod2code: 'dmg%-melee-min',
      mod2min: -damageReduction,
      mod2max: -damageReduction,
      mod3code: 'dmg%-melee-max',
      mod3min: -damageReduction,
      mod3max: -damageReduction,
      transformcolor: 'blac', // doesn't matter for charms
      multiply: 0, // item price multiplier
      add: 0, // item price modifier
      '*eol\r': 0,
      ...itypes,
    });
  });

  D2RMM.writeTsv(magicsuffixFilename, magicsuffix);
}

const skillsFilename = 'global\\excel\\skills.txt';
const skills = D2RMM.readTsv(skillsFilename);
skills.rows.push({
  skill: 'Melee Area Damage', // links with missiles.txt
  '*Id': Math.max(...skills.rows.map((row) => row['*Id'])) + 1,
  srvdofunc: 68, // shout nova
  cltdofunc: 25, // nova
  srvmissilea: 'meleeareadamage', // links with missiles.txt
  cltmissilea: 'meleeareadamage', // links with missiles.txt
  cltcalc1: 0,
  '*cltcalc1 desc': 'Missile Velocity Adder',
  calc4: 0,
  '*calc4 desc': 'Stun Length',
  enhanceable: 1, // true for slvl=1 skills
  attackrank: 3, // how likely a monster is to retaliate against this attack
  range: 'none', // AoE spell
  anim: 'SC', // animation used
  seqtrans: 'SC', // animation sequence transition (not used) - doesn't really matter
  minanim: 'xx', // animation used for monsters - doesn't really matter
  UseAttackRate: 1, // unknown, doesn't seem to do anything
  ItemEffect: 36, // fire missile from target rather than player
  ItemCltEffect: 10, // fire missile from target rather than player
  minmana: 0, // minimum mana cost
  manashift: 8, // mana cost precision
  mana: 0, // mana cost at level 1
  lvlmana: 0, // additional mana cost per level
  interrupt: 0, // can be interrupted while casting
  InGame: 1, // skill is available in game
  HitShift: 8, // precision of damage (8 = 256/256 = 100%)
  SrcDam: Math.max(1, Math.min(128, Math.round((128 * damageInArea) / 100))), // percentage of weapon damage applied to skill (base 128)
  'cost mult': 384, // base price of item is multiplied by this value when affix is present
  'cost add': 8000, // base price of item is modified by this value when affix is present
  '*eol\r': 0,
});
D2RMM.writeTsv(skillsFilename, skills);

const missilesFilename = 'global\\excel\\missiles.txt';
const missiles = D2RMM.readTsv(missilesFilename);
missiles.rows.push({
  // based on "frostnova" and "warcry"
  Missile: 'meleeareadamage',
  '*ID': Math.max(...missiles.rows.map((row) => row['*ID'])) + 1,
  pCltDoFunc: 1,
  pCltHitFunc: 10,
  pSrvDoFunc: 1,
  // about 48 (6 * 4 * 2) pixels total makes the area damage apply to enemies nearby
  // the enemy that was hit but not other enemies nearby the character
  Vel: 6, // pixels / frame
  MaxVel: 6, // pixels / frame
  Accel: 0, // pixels / frame / frame
  Range: 4 * Math.max(1, Math.round(config.radius)), // number of frames
  Red: 192,
  Green: 192,
  Blue: 192,
  InitSteps: 1,
  Activate: 0,
  LoopAnim: 0,
  // TODO: this doesn't show anything in classic graphics mode
  // should probably use something else instead...
  CelFile: 'BAYellShockWave01', // the DCC file
  animrate: 1024,
  AnimLen: 15,
  AnimSpeed: 16,
  CollideType: 3, // normal collision (walls + units)
  LastCollide: 1,
  NextHit: 1,
  NextDelay: 4,
  Size: 1,
  ReturnFire: 1,
  GetHit: 1,
  Trans: 1,
  Skill: 'Melee Area Damage', // links with skills.txt for damage
  ResultFlags: 4,
  HitClass: 6, // sounds like throwing weapons hitting something
  NumDirections: 32, // must match the DCC file
  ProgOverlay: 'doubledamage1', // based on warcry / leapattack
  '*eol\r': 0,
});
D2RMM.writeTsv(missilesFilename, missiles);

const hdmissilesFilename = 'hd\\missiles\\missiles.json';
const hdmissiles = D2RMM.readJson(hdmissilesFilename);
hdmissiles.meleeareadamage = 'melee_area_damage';
D2RMM.writeJson(hdmissilesFilename, hdmissiles);

D2RMM.writeJson('hd\\missiles\\melee_area_damage.json', {
  dependencies: {
    particles: [
      {
        path: 'data/hd/vfx/particles/missiles/explosion_spark_small/vfx_explosion_spark_small.particles',
      },
    ],
    models: [],
    skeletons: [],
    animations: [],
    textures: [],
    physics: [],
    json: [],
    variantdata: [],
    objecteffects: [],
    other: [],
  },
  type: 'UnitDefinition',
  name: 'melee_area_damage',
  entities: [
    {
      type: 'Entity',
      name: 'entity_root',
      id: 2527807554 + 1, // TODO: how to get a unique ID here?
      components: [
        {
          type: 'UnitRootComponent',
          name: 'component_root',
          state_machine_filename: '',
          doNotInheritRotation: false,
          rotationOverride: { x: 0, y: 0.3826834, z: 0, w: 0.9238795 },
          doNotUseHDHeight: false,
          hideAllMeshWhenInOpenedMode: false,
          onCreateEventName: '',
          animations: [],
        },
      ],
    },
    {
      type: 'Entity',
      name: 'entity_vfx1',
      id: 3060251343 + 1, // TODO: how to get a unique ID here?
      components: [
        {
          type: 'TransformDefinitionComponent',
          name: 'component_transform1',
          position: { x: 0, y: 2, z: 0 },
          orientation: { x: 0, y: 0, z: 0, w: 1 },
          scale: { x: 1, y: 1, z: 1 },
          inheritOnlyPosition: false,
        },
        {
          type: 'VfxDefinitionComponent',
          name: 'entity_vfx1_VfxDefinition',
          filename:
            'data/hd/vfx/particles/missiles/explosion_spark_small/vfx_explosion_spark_small.particles',
          hardKillOnDestroy: false,
        },
      ],
    },
  ],
});

const itemNameAffixesFilename = 'local\\lng\\strings\\item-nameaffixes.json';
const itemNameAffixes = D2RMM.readJson(itemNameAffixesFilename);
itemNameAffixes.push({
  id: D2RMM.getNextStringID(),
  Key: 'of Melee Area Damage',
  enUS: 'of Melee Area Damage',
  zhTW: '近战范围伤害',
  deDE: 'des Nahkampfbereichsschadens',
  esES: 'de daño en el área cuerpo a cuerpo',
  frFR: 'de dégâts de zone de mêlée',
  itIT: 'del danno ad area da mischia',
  koKR: '근접 지역 피해',
  plPL: 'uszkodzenie obszaru walki wręcz',
  esMX: 'de daño en el área cuerpo a cuerpo',
  jaJP: '近接エリアのダメージ',
  ptBR: 'de dano de área corpo a corpo',
  ruRU: 'ближнего боя по области',
  zhCN: '近战范围伤害',
});
D2RMM.writeJson(itemNameAffixesFilename, itemNameAffixes);

const itemModifiersFilename = 'local\\lng\\strings\\item-modifiers.json';
const itemModifiers = D2RMM.readJson(itemModifiersFilename);
itemModifiers.push({
  id: D2RMM.getNextStringID(),
  Key: 'MeleeAreaDamage',
  enUS: '%d%% Chance of Melee Area Damage',
  zhTW: '%d%% 有机会造成近战区域伤害',
  deDE: '%d%% Chance auf Nahkampfbereichsschadens',
  esES: '%d%% de probabilidad de daño en el área cuerpo a cuerpo',
  frFR: '%d%% de chances de dégâts de zone de mêlée',
  itIT: 'Probabilità del danno ad area da mischia del %d%%',
  koKR: '근접 지역 피해 확률 %d%%',
  plPL: '%d%% szansy na uszkodzenie obszaru walki wręcz',
  esMX: '%d%% de probabilidad de daño en el área cuerpo a cuerpo',
  jaJP: '近接エリアのダメージ（%d%%の確率）',
  ptBR: '%d%% de chance de dano de área corpo a corpo',
  ruRU: 'Вероятность %d%% нанести удар ближнего боя по области',
  zhCN: '%d%% 有机会造成近战区域伤害',
});
itemModifiers.push({
  id: D2RMM.getNextStringID(),
  Key: 'MeleeMinDamagePercent',
  enUS: '%+d%% Enhanced Minimum Melee Damage',
  zhTW: '%+d%% 提高近战最低伤害',
  deDE: '%+d%% Verbesserter min. Nahkampfschaden',
  esES: '%+d%% de daño mínimo cuerpo a cuerpo mejorado',
  frFR: 'Dégâts de mêlée min. améliorés de %+d%%',
  itIT: '%+d%% danni minimi in mischia',
  koKR: '최소 근접 피해 %+d%% 증가',
  plPL: '%+d%% do minimalnych obrażeń w walce wręcz',
  esMX: '%+d%% de daño mínimo cuerpo a cuerpo mejorado',
  jaJP: '最小近接ダメージ強化（%+d%%）',
  ptBR: '%+d%% de dano mínimo corpo a corpo aprimorado',
  ruRU: '%+d%% к минимальному урону в ближнем бою',
  zhCN: '%+d%% 提高近战最低伤害',
});
itemModifiers.push({
  id: D2RMM.getNextStringID(),
  Key: 'MeleeMaxDamagePercent',
  enUS: '%+d%% Enhanced Maximum Melee Damage',
  zhTW: '%+d%% 提升近战最大伤害',
  deDE: '%+d%% Verbesserter max. Nahkampfschaden',
  esES: '%+d%% de daño máximo cuerpo a cuerpo mejorado',
  frFR: 'Dégâts de mêlée max. améliorés de %+d%%',
  itIT: '%+d%% danni massimi in mischia',
  koKR: '최대 근접 피해 %+d%% 증가',
  plPL: '%+d%% do maksymalnych obrażeńw walce wręcz',
  esMX: '%+d%% de daño máximo cuerpo a cuerpo mejorado',
  jaJP: '最大近接ダメージ強化（%+d%%）',
  ptBR: '%+d%% de dano máximo corpo a corpo aprimorado',
  ruRU: '%+d%% к максимальному урону в ближнем бою',
  zhCN: '%+d%% 提升近战最大伤害',
});
D2RMM.writeJson(itemModifiersFilename, itemModifiers);

if (config.unique) {
  const miscFilename = 'global\\excel\\misc.txt';
  const misc = D2RMM.readTsv(miscFilename);
  misc.rows.push({
    ...misc.rows.find((row) => row.name === 'Small Charm'),
    name: 'Charm of Melee Area Damage',
    level: 1,
    code: 'cm0',
    unique: 1,
    cost: 0,
    'gamble cost': 0,
    GheedMin: 1,
    GheedMax: 1,
    GheedMagicMin: 1,
    GheedMagicMax: 1,
    GheedMagicLevel: 255,
    PermStoreItem: 1,
    multibuy: 1,
    NightmareUpgrade: 'xxx',
    HellUpgrade: 'xxx',
  });
  D2RMM.writeTsv(miscFilename, misc);

  const uniqueitemsFilename = 'global\\excel\\uniqueitems.txt';
  const uniqueitems = D2RMM.readTsv(uniqueitemsFilename);
  const damageReduction = getDamageReduction(100);
  uniqueitems.rows.push({
    ...uniqueitems.rows.find((row) => row.index === 'Annihilus'),
    index: 'Charm of Melee Area Damage', // links with item-names.json
    '*ID': Math.max(...uniqueitems.rows.map((row) => row['*ID'])) + 1,
    lvl: 1, // need to be low level in order for Gheed to be able to sell it
    'lvl req': 1, // needs to be low level in order to be useable
    code: 'cm0', // need a new code so it can be sold in shop
    'cost mult': 1,
    'cost add': 1,
    prop1: 'dmg-meleearea', // links with properties.txt
    par1: 'Melee Area Damage', // links with skills.txt
    min1: 100, // % Chance (If 0, then default to 5)
    max1: 1, // Skill Level
    prop2: 'dmg%-melee-min',
    par2: null,
    min2: -damageReduction,
    max2: -damageReduction,
    prop3: 'dmg%-melee-max',
    par3: null,
    min3: -damageReduction,
    max3: -damageReduction,
    prop4: null,
    par4: null,
    min4: null,
    max4: null,
    '*eol\r': 0,
  });
  D2RMM.writeTsv(uniqueitemsFilename, uniqueitems);

  const itemsFilename = 'hd\\items\\items.json';
  const items = D2RMM.readJson(itemsFilename);
  items.push({
    cm0: { asset: 'charm/charm_small' },
  });
  D2RMM.writeJson(itemsFilename, items);

  const itemNamesFilename = 'local\\lng\\strings\\item-names.json';
  const itemNames = D2RMM.readJson(itemNamesFilename);
  itemNames.push({
    id: D2RMM.getNextStringID(),
    Key: 'Charm of Melee Area Damage',
    enUS: 'Charm of Melee Area Damage',
    zhTW: '近战范围伤害的魅力',
    deDE: 'Zauber des Nahkampfbereichsschadens',
    esES: 'Dije de daño de área cuerpo a cuerpo',
    frFR: 'Charme de dégâts de zone de mêlée',
    itIT: 'Talismano del danno ad area da mischia',
    koKR: '근접 영역 피해의 매력',
    plPL: 'Talizman obrażeń obszarowych w walce wręcz',
    esMX: 'Talismán de daño de área cuerpo a cuerpo',
    jaJP: 'タリスマンオブメレーエリアダメージ',
    ptBR: 'Patuá de Dano de Área Corpo a Corpo',
    ruRU: 'Оберег урона ближнего боя по области',
    zhCN: '近战范围伤害的魅力',
  });
  D2RMM.writeJson(itemNamesFilename, itemNames);
}

// TODO: option to randomly spawn affixed on weapons
// TODO: option to add affix to select unique / set / runeword weapons (that are intended for melee damage dealers)
