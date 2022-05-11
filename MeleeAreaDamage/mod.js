if (D2RMM.getVersion == null || D2RMM.getVersion() < 1.5) {
  D2RMM.error('Requires D2RMM version 1.5 or higher.');
  return;
}

const magicsuffixFilename = 'global\\excel\\magicsuffix.txt';
const magicsuffix = D2RMM.readTsv(magicsuffixFilename);
magicsuffix.rows.push({
  Name: 'of Area Damage', // links with item-nameaffixes.json
  version: 1, // availabe in both Classic and LoD
  spawnable: 1, // can spawn
  rare: 1, // can appear on both magic and rare items
  level: 1, // minimum item level for the affix to spawn
  levelreq: 1, // minimum character level to use item with affix
  // TODO: set to a reasonable number, like 100
  frequency: 1000000, // frequency of affix appearing
  // group for deduplicating affixes (use some non-existant one)
  group: Math.max(...magicsuffix.rows.map((row) => row.group)) + 1,
  mod1code: 'dmg-meleearea', // links with properties.txt
  mod1param: 'Melee Area Damage', // links with skills.txt
  mod1min: 100, // % Chance (If 0, then default to 5)
  mod1max: 1, // Skill Level
  transformcolor: 'blac', // doesn't matter for charms
  itype1: 'scha', // only applicable to small charms
  multiply: 0, // item price multiplier
  add: 0, // item price modifier
  '*eol\r': 0,
});
D2RMM.writeTsv(magicsuffixFilename, magicsuffix);

const propertiesFilename = 'global\\excel\\properties.txt';
const properties = D2RMM.readTsv(propertiesFilename);
properties.rows.push({
  code: 'dmg-meleearea',
  '*Enabled': 1,
  func1: 11, // event-based skills
  stat1: 'item_meleeareadamage', // linked with itemstatcost.txt
  '*Tooltip': '#% Chance of Area Damage',
  '*Parameter': 'Skill',
  '*Min': '% Chance (If 0, then default to 5)',
  '*Max': 'Skill Level',
  '*eol\r': 0,
});
D2RMM.writeTsv(propertiesFilename, properties);

const itemstatcostFilename = 'global\\excel\\itemstatcost.txt';
const itemstatcost = D2RMM.readTsv(itemstatcostFilename);
const itemstatcostID = Math.max(...itemstatcost.rows.map((row) => row['*ID']));
itemstatcost.rows.push({
  Stat: 'item_meleeareadamage',
  '*ID': itemstatcostID + 1,
  Signed: 1, // no idea, based on item_skillonhit
  'Send Bits': 7, // no idea, based on item_skillonhit
  'Send Param Bits': 16, // no idea, based on item_skillonhit
  fCallback: 1, // no idea, based on item_skillonhit
  Add: 190, // item cost modifier
  Multiply: 256, // item cost multiplier
  '1.09-Save Bits': 21, // no idea, based on item_skillonhit
  '1.09-Save Add': 0, // no idea, based on item_skillonhit
  'Save Bits': 7, // no idea, based on item_skillonhit
  'Save Add': 0, // no idea, based on item_skillonhit
  'Save Param Bits': 16, // no idea, based on item_skillonhit
  damagerelated: 1,
  itemevent1: 'domeleedamage', // when melee damage is done
  itemeventfunc1: 20, // based on item_skillonhit
  descpriority: 200, // description priority (display earlier)
  descfunc: 19, // format in value + label ("#% Chance of Area Damage") format
  descstrpos: 'MeleeAreaDamage', // links with item-modifiers.json
  descstrneg: 'MeleeAreaDamage', // links with item-modifiers.json
  '*eol\r': 0,
});
D2RMM.writeTsv(itemstatcostFilename, itemstatcost);

const skillsFilename = 'global\\excel\\skills.txt';
const skills = D2RMM.readTsv(skillsFilename);
const skillsID = Math.max(...skills.rows.map((row) => row['*Id']));
skills.rows.push({
  // based on "Frost Nova"
  skill: 'Melee Area Damage', // links with missiles.txt
  '*Id': skillsID + 1,
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
  ItemCtlEffect: 10, // fire missile from target rather than player
  minmana: 0, // minimum mana cost
  manashift: 8, // mana cost precision
  mana: 0, // mana cost at level 1
  lvlmana: 0, // additional mana cost per level
  interrupt: 0, // can be interrupted while casting
  InGame: 1, // skill is available in game
  HitShift: 8, // precision of damage (8 = 256/256 = 100%)
  SrcDam: 64, // percentage of weapon damage applied to skill (base 128)
  'cost mult': 384, // base price of item is multiplied by this value when affix is present
  'cost add': 8000, // base price of item is modified by this value when affix is present
  '*eol\r': 0,
});
D2RMM.writeTsv(skillsFilename, skills);

const missilesFilename = 'global\\excel\\missiles.txt';
const missiles = D2RMM.readTsv(missilesFilename);
const missilesID = Math.max(...missiles.rows.map((row) => row['*ID']));
missiles.rows.push({
  // based on "frostnova" and "warcry"
  Missile: 'meleeareadamage',
  '*ID': missilesID + 1,
  pCltDoFunc: 1,
  pCltHitFunc: 10,
  pSrvDoFunc: 1,
  // about 48 pixels total makes the area damage apply to enemies nearby
  // the enemy that was hit but not other enemies nearby the character
  Vel: 12, // pixels / frame
  MaxVel: 12, // pixels / frame
  Accel: 0, // pixels / frame / frame
  Range: 4, // number of frames
  Red: 192,
  Green: 192,
  Blue: 192,
  InitSteps: 1,
  Activate: 0,
  LoopAnim: 0,
  // for some reason, the actual projectile is not visible for *any* row in missiles.txt
  // that's added (beyond the vanilla ones) - even if the data in the row is ~100% identical
  // to an existing row - I have no idea why
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

const itemNameAffixesFilename = 'local\\lng\\strings\\item-nameaffixes.json';
const itemNameAffixes = D2RMM.readJson(itemNameAffixesFilename);
itemNameAffixes.push({
  id: D2RMM.getNextStringID(),
  Key: 'of Area Damage',
  enUS: 'of Area Damage',
  zhTW: '穿透之', // TODO
  deDE: 'des Durchstoßens', // TODO
  esES: 'de perforación', // TODO
  frFR: 'd’empalement', // TODO
  itIT: 'della Penetrazione', // TODO
  koKR: '관통의', // TODO
  plPL: 'Przeszycia', // TODO
  esMX: 'de penetración', // TODO
  jaJP: '貫通の', // TODO
  ptBR: 'da Furação', // TODO
  ruRU: 'пронзания', // TODO
  zhCN: '刺穿之', // TODO
});
D2RMM.writeJson(itemNameAffixesFilename, itemNameAffixes);

const itemModifiersFilename = 'local\\lng\\strings\\item-modifiers.json';
const itemModifiers = D2RMM.readJson(itemModifiersFilename);
itemModifiers.push({
  id: D2RMM.getNextStringID(),
  Key: 'MeleeAreaDamage',
  enUS: '%d%% Chance of Area Damage',
  zhTW: '%d%% 機率造成粉碎打擊', // TODO
  deDE: '%d%% Chance auf vernichtenden Schlag', // TODO
  esES: '%d%% de probabilidad de ataque aplastante', // TODO
  frFR: '%d%% de chances de coups écrasants', // TODO
  itIT: 'Probabilità di colpo frantumante aumentata del %d%%', // TODO
  koKR: '강타 확률 %d%%', // TODO
  plPL: '%d%% szansy na druzgocące uderzenie', // TODO
  esMX: '%d%% de probabilidad de golpe aplastante', // TODO
  jaJP: 'クラッシング・ブロー（%d%%の確率）', // TODO
  ptBR: '%d%% de chance de Golpe Esmagador', // TODO
  ruRU: 'Вероятность %d%% нанести сокрушительный удар', // TODO
  zhCN: '%d%% 几率粉碎打击', // TODO
});
D2RMM.writeJson(itemModifiersFilename, itemModifiers);
