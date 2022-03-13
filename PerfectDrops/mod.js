const runesFilename = 'global\\excel\\runes.txt';
const runes = D2RMM.readTsv(runesFilename);
runes.rows.forEach((row) => {
  // runewords don't follow the same generation rules as other items
  // so UpdateRow is not necessary here (I think)
  row.T1Min1 = row.T1Max1;
  row.T1Min2 = row.T1Max2;
  row.T1Min3 = row.T1Max3;
  row.T1Min4 = row.T1Max4;
  row.T1Min5 = row.T1Max5;
  row.T1Min6 = row.T1Max6;
  row.T1Min7 = row.T1Max7;
});
D2RMM.writeTsv(runesFilename, runes);

const EXCLUDE_CODES = [
  // value is class
  'randclassskill',
  // value is skill
  'skill-rand',
  // param = spell, min = charges, max = level
  // min/max can also be nagative: https://d2mods.info/forum/viewtopic.php?p=67042&highlight=magicsuffix+charged#67042
  'charged',
  // param = spell, min = chance, max = level
  'att-skill',
  'gethit-skill',
  'hit-skill',
];

function UpdateRow(row, codeKey, minKey, maxKey) {
  const code = row[codeKey];
  const minValue = +row[minKey];
  const maxValue = +row[maxKey];

  if (EXCLUDE_CODES.indexOf(code) === -1 && minValue < maxValue) {
    row[minKey] = row[maxKey];
  }
}

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
