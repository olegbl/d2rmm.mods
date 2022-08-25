const EXCLUDE_CODES = [
  // add skill points to class
  // value is class
  'randclassskill',
  // add skill points to specific skill
  // value is skill
  'skill-rand',
  // param = spell, min = charges, max = level
  // min/max can also be nagative: https://d2mods.info/forum/viewtopic.php?p=67042&highlight=magicsuffix+charged#67042
  'charged',
  // cast skill on action
  // param = spell, min = chance, max = level
  'att-skill',
  'death-skill',
  'gethit-skill',
  'hit-skill',
  'kill-skill',
  'levelup-skill',
  // variable damage affixes (e.g. +15-45 cold damage, randomized on each hit)
  // param = spell, min = min damage, max = max damage
  'dmg-fire',
  'dmg-ltng',
  'dmg-mag',
  'dmg-cold',
  'dmg-pois',
  'dmg-throw',
  'dmg-norm',
  'dmg-elem',
];

function UpdateRow(row, codeKey, minKey, maxKey) {
  const code = row[codeKey];
  const minValue = +row[minKey];
  const maxValue = +row[maxKey];

  if (EXCLUDE_CODES.indexOf(code) === -1 && minValue < maxValue) {
    row[minKey] = row[maxKey];
  }
}

const runesFilename = 'global\\excel\\runes.txt';
const runes = D2RMM.readTsv(runesFilename);
runes.rows.forEach((row) => {
  UpdateRow(row, 'T1Param1', 'T1Min1', 'T1Max1');
  UpdateRow(row, 'T1Param2', 'T1Min2', 'T1Max2');
  UpdateRow(row, 'T1Param3', 'T1Min3', 'T1Max3');
  UpdateRow(row, 'T1Param4', 'T1Min4', 'T1Max4');
  UpdateRow(row, 'T1Param5', 'T1Min5', 'T1Max5');
  UpdateRow(row, 'T1Param6', 'T1Min6', 'T1Max6');
  UpdateRow(row, 'T1Param7', 'T1Min7', 'T1Max7');
});
D2RMM.writeTsv(runesFilename, runes);

const automagicFilename = 'global\\excel\\automagic.txt';
const automagic = D2RMM.readTsv(automagicFilename);
automagic.rows.forEach((row) => {
  UpdateRow(row, 'mod1code', 'mod1min', 'mod1max');
  UpdateRow(row, 'mod2code', 'mod2min', 'mod2max');
  UpdateRow(row, 'mod3code', 'mod3min', 'mod3max');

  if (config.equalchances) {
    // make all variants of the mod equally likely rather than
    // low level variants appearing more frequently
    row.frequency = 1;
  }
});
D2RMM.writeTsv(automagicFilename, automagic);

const uniqueitemsFilename = 'global\\excel\\uniqueitems.txt';
const uniqueitems = D2RMM.readTsv(uniqueitemsFilename);
uniqueitems.rows.forEach((row) => {
  UpdateRow(row, 'prop1', 'min1', 'max1');
  UpdateRow(row, 'prop2', 'min2', 'max2');
  UpdateRow(row, 'prop3', 'min3', 'max3');
  UpdateRow(row, 'prop4', 'min4', 'max4');
  UpdateRow(row, 'prop5', 'min5', 'max5');
  UpdateRow(row, 'prop6', 'min6', 'max6');
  UpdateRow(row, 'prop7', 'min7', 'max7');
  UpdateRow(row, 'prop8', 'min8', 'max8');
  UpdateRow(row, 'prop9', 'min9', 'max9');
  UpdateRow(row, 'prop10', 'min10', 'max10');
  UpdateRow(row, 'prop11', 'min11', 'max11');
  UpdateRow(row, 'prop12', 'min12', 'max12');
});
D2RMM.writeTsv(uniqueitemsFilename, uniqueitems);

const setitemsFilename = 'global\\excel\\setitems.txt';
const setitems = D2RMM.readTsv(setitemsFilename);
setitems.rows.forEach((row) => {
  UpdateRow(row, 'prop1', 'min1', 'max1');
  UpdateRow(row, 'prop2', 'min2', 'max2');
  UpdateRow(row, 'prop3', 'min3', 'max3');
  UpdateRow(row, 'prop4', 'min4', 'max4');
  UpdateRow(row, 'prop5', 'min5', 'max5');
  UpdateRow(row, 'prop6', 'min6', 'max6');
  UpdateRow(row, 'prop7', 'min7', 'max7');
  UpdateRow(row, 'prop8', 'min8', 'max8');
  UpdateRow(row, 'prop9', 'min9', 'max9');

  // not sure if amin1a/amax1a/etc... should also be equalized
  // they seem to be for the set item affixes, which shouldn't vary
});
D2RMM.writeTsv(setitemsFilename, setitems);

const qualityitemsFilename = 'global\\excel\\qualityitems.txt';
const qualityitems = D2RMM.readTsv(qualityitemsFilename);
qualityitems.rows.forEach((row) => {
  row.mod1min = row.mod1max;
  row.mod2min = row.mod2max;
});
D2RMM.writeTsv(qualityitemsFilename, qualityitems);

const adjustAffixRow = (row) => {
  if (config.blue) {
    UpdateRow(row, 'mod1code', 'mod1min', 'mod1max');
    UpdateRow(row, 'mod2code', 'mod2min', 'mod2max');
    UpdateRow(row, 'mod3code', 'mod3min', 'mod3max');

    if (config.equalchances && row.frequency !== '' && row.frequency !== '0') {
      // make all variants of the mod equally likely rather than
      // low level variants appearing more frequently
      row.frequency = 1;
    }
  }

  // it would be nice to also be able to modify staffmods (+skill to single skill on class items)
  // but that seems to be hardcoded into D2 without any way to override it from /data/
  if (config.skilltab3) {
    if (row.mod1code === 'skilltab') {
      row.mod1min = 3;
      row.mod1max = 3;
    }
    if (row.mod2code === 'skilltab') {
      row.mod2min = 3;
      row.mod2max = 3;
    }
    if (row.mod3code === 'skilltab') {
      row.mod3min = 3;
      row.mod3max = 3;
    }
  }
};

if (config.blue || config.skilltab3) {
  const magicprefixFilename = 'global\\excel\\magicprefix.txt';
  const magicprefix = D2RMM.readTsv(magicprefixFilename);
  magicprefix.rows.forEach(adjustAffixRow);
  D2RMM.writeTsv(magicprefixFilename, magicprefix);

  const magicsuffixFilename = 'global\\excel\\magicsuffix.txt';
  const magicsuffix = D2RMM.readTsv(magicsuffixFilename);
  magicsuffix.rows.forEach(adjustAffixRow);
  D2RMM.writeTsv(magicsuffixFilename, magicsuffix);
}

if (config.defense) {
  const armorFilename = 'global\\excel\\armor.txt';
  const armor = D2RMM.readTsv(armorFilename);
  armor.rows.forEach((row) => {
    if (+row.maxac > +row.minac) {
      row.minac = row.maxac;
    }
  });
  D2RMM.writeTsv(armorFilename, armor);
}

if (config.crafted) {
  const cubemainFilename = 'global\\excel\\cubemain.txt';
  const cubemain = D2RMM.readTsv(cubemainFilename);
  cubemain.rows.forEach((row) => {
    if (row.output === '"usetype,crf"') {
      UpdateRow(row, 'mod 1', 'mod 1 min', 'mod 1 max');
      UpdateRow(row, 'mod 2', 'mod 2 min', 'mod 2 max');
      UpdateRow(row, 'mod 3', 'mod 3 min', 'mod 3 max');
      UpdateRow(row, 'mod 4', 'mod 4 min', 'mod 4 max');
      UpdateRow(row, 'mod 5', 'mod 5 min', 'mod 5 max');
    }
  });
  D2RMM.writeTsv(cubemainFilename, cubemain);
}
