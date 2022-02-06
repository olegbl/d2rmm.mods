const automagicFilename = 'global\\excel\\automagic.txt';
const automagic = D2RMM.readTsv(automagicFilename);
automagic.rows.forEach((row) => {
  row.mod1min = row.mod1max;
  row.mod2min = row.mod2max;
  row.mod3min = row.mod3max;

  if (config.equalchances) {
    // make all variants of the mod equally likely rather than
    // low level variants appearing more frequently
    row.frequency = 1;
  }
});
D2RMM.writeTsv(automagicFilename, automagic);

const runesFilename = 'global\\excel\\runes.txt';
const runes = D2RMM.readTsv(runesFilename);
runes.rows.forEach((row) => {
  row.T1Min1 = row.T1Max1;
  row.T1Min2 = row.T1Max2;
  row.T1Min3 = row.T1Max3;
  row.T1Min4 = row.T1Max4;
  row.T1Min5 = row.T1Max5;
  row.T1Min6 = row.T1Max6;
  row.T1Min7 = row.T1Max7;
});
D2RMM.writeTsv(runesFilename, runes);

const uniqueitemsFilename = 'global\\excel\\uniqueitems.txt';
const uniqueitems = D2RMM.readTsv(uniqueitemsFilename);
uniqueitems.rows.forEach((row) => {
  row.min1 = row.max1;
  row.min2 = row.max2;
  row.min3 = row.max3;
  row.min4 = row.max4;
  row.min5 = row.max5;
  row.min6 = row.max6;
  row.min7 = row.max7;
  row.min8 = row.max8;
  row.min9 = row.max9;
  row.min10 = row.max10;
  row.min11 = row.max11;
  row.min12 = row.max12;
});
D2RMM.writeTsv(uniqueitemsFilename, uniqueitems);

const setitemsFilename = 'global\\excel\\setitems.txt';
const setitems = D2RMM.readTsv(setitemsFilename);
setitems.rows.forEach((row) => {
  row.min1 = row.max1;
  row.min2 = row.max2;
  row.min3 = row.max3;
  row.min4 = row.max4;
  row.min5 = row.max5;
  row.min6 = row.max6;
  row.min7 = row.max7;
  row.min8 = row.max8;
  row.min9 = row.max9;

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
    row.mod1min = row.mod1max;
    row.mod2min = row.mod2max;
    row.mod3min = row.mod3max;

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
