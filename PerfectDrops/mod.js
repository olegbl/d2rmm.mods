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

// some rows in automagic/magicprefix/magicaffix serve as lower tier affixes
// for multiple different higher tier affixes (for example, a lower tier affix
// might work for weapons and armor, but from then on, weapon and armor progression
// follows different affixes)
// here, we split those affixes into multiple rows, one for each item type
// in order to not break existing items, we have to make sure we're appending to the
// end of the table, and not modifying any existing mods in terms of what item types
// they can appear on, so instead, we set them to unspawnable
function SplitAffixesIntoOneAffixPerItemType(rows, startIndex) {
  // we only need to do this if we're going to try to make affix tiers perfect
  if (config.equalchances !== 'perfect') {
    return;
  }

  // pad the rows so that we're always modifying the same index even
  // after the game updates and adds more affixes
  // this also enables to *very limited* compatibility with other mods
  // that do this kind of thing
  for (let i = rows.length; i < startIndex - 1; i++) {
    rows.push({ multiply: '0', 'add\r': 0 });
  }

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];

    const types = [
      row.itype1,
      row.itype2,
      row.itype3,
      row.itype4,
      row.itype5,
      row.itype6,
      row.itype7,
    ].filter((type) => type !== '');

    // ignore rows for affixes that can't naturally spawn anyway
    if (row.spawnable != '1') {
      continue;
    }

    // ignore rows that already only influence one base item type
    if (types.length <= 1) {
      continue;
    }

    // set the raw as unspawnable
    row.spawnable = 0;

    // insert new rows instead
    for (const type of types) {
      rows.push({
        ...row,
        spawnable: 1,
        itype1: type,
        itype2: '',
        itype3: '',
        itype4: '',
        itype5: '',
        itype6: '',
        itype7: '',
      });
    }
  }
}

let affixTierMap = new Map();

function getAffixTierKey(row) {
  return `${row.group}:${row.itype1}:${row.mod1code}:${row.mod2code}:${row.mod3code}:${row.mod1param}:${row.mod2param}:${row.mod3param}`;
}

function CalculateAffixTierMap(rows) {
  // we only need to do this if we're going to try to make affix tiers perfect
  if (config.equalchances !== 'perfect') {
    return;
  }

  affixTierMap = new Map();
  for (const row of rows) {
    const key = getAffixTierKey(row);
    const set = affixTierMap.get(key) ?? new Set();
    affixTierMap.set(key, set.add(row));
  }
}

function getAllAffixTiers(row, rows) {
  const key = getAffixTierKey(row);
  const set = affixTierMap.get(key);
  return (
    [...set]
      // sort by affix tier in descending order
      .sort((a, b) => a.level - b.level)
  );
}

function UpdateFrequency(row, rows) {
  if (config.equalchances === true) {
    if (row.frequency != '' && row.frequency != '0') {
      // equalize the chances of all affix tiers within each group
      row.frequency = '1';
    }
  }

  if (config.equalchances === 'perfect') {
    if (row.level == '') {
      return;
    }

    // check if there's a previous affix tier for this affix
    const affixes = getAllAffixTiers(row, rows);
    const index = affixes.findIndex((r) => r.level == row.level);
    const previousAffixTier = index > 0 ? affixes[index - 1] : null;

    if (previousAffixTier != null) {
      // frequency can only hold a maximum value of 255, so instead of making
      // higher tiers of affixes *more likely* to drop, we just prevent lower
      // tiers of affixes from being able to drop for a higher level item at all
      previousAffixTier.maxlevel = row.level - 1;
    }
  }
}

if (config.runeword) {
  ['global\\excel\\runes.txt', 'global\\excel\\base\\runes.txt'].forEach(
    (fileName) => {
      const fileContent = D2RMM.readTsv(fileName);
      if (!fileContent) return;
      fileContent.rows.forEach((row) => {
        UpdateRow(row, 'T1Code1', 'T1Min1', 'T1Max1');
        UpdateRow(row, 'T1Code2', 'T1Min2', 'T1Max2');
        UpdateRow(row, 'T1Code3', 'T1Min3', 'T1Max3');
        UpdateRow(row, 'T1Code4', 'T1Min4', 'T1Max4');
        UpdateRow(row, 'T1Code5', 'T1Min5', 'T1Max5');
        UpdateRow(row, 'T1Code6', 'T1Min6', 'T1Max6');
        UpdateRow(row, 'T1Code7', 'T1Min7', 'T1Max7');
      });
      D2RMM.writeTsv(fileName, fileContent);
    },
  );
}

if (config.automagic) {
  [
    'global\\excel\\automagic.txt',
    'global\\excel\\base\\automagic.txt',
  ].forEach((fileName) => {
    const fileContent = D2RMM.readTsv(fileName);
    if (!fileContent) return;
    SplitAffixesIntoOneAffixPerItemType(fileContent.rows, 100);
    CalculateAffixTierMap(fileContent.rows);
    fileContent.rows.forEach((row, index, rows) => {
      UpdateRow(row, 'mod1code', 'mod1min', 'mod1max');
      UpdateRow(row, 'mod2code', 'mod2min', 'mod2max');
      UpdateRow(row, 'mod3code', 'mod3min', 'mod3max');
      UpdateFrequency(row, rows);
    });
    D2RMM.writeTsv(fileName, fileContent);
  });
}

if (config.unique) {
  [
    'global\\excel\\uniqueitems.txt',
    'global\\excel\\base\\uniqueitems.txt',
  ].forEach((fileName) => {
    const fileContent = D2RMM.readTsv(fileName);
    if (!fileContent) return;
    fileContent.rows.forEach((row) => {
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
    D2RMM.writeTsv(fileName, fileContent);
  });
}

if (config.set) {
  ['global\\excel\\setitems.txt', 'global\\excel\\base\\setitems.txt'].forEach(
    (fileName) => {
      const fileContent = D2RMM.readTsv(fileName);
      if (!fileContent) return;
      fileContent.rows.forEach((row) => {
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
      D2RMM.writeTsv(fileName, fileContent);
    },
  );
}

if (config.highquality) {
  [
    'global\\excel\\qualityitems.txt',
    'global\\excel\\base\\qualityitems.txt',
  ].forEach((fileName) => {
    const fileContent = D2RMM.readTsv(fileName);
    if (!fileContent) return;
    fileContent.rows.forEach((row) => {
      row.mod1min = row.mod1max;
      row.mod2min = row.mod2max;
    });
    D2RMM.writeTsv(fileName, fileContent);
  });
}

const adjustAffixRow = (row, index, rows) => {
  if (config.blue) {
    UpdateRow(row, 'mod1code', 'mod1min', 'mod1max');
    UpdateRow(row, 'mod2code', 'mod2min', 'mod2max');
    UpdateRow(row, 'mod3code', 'mod3min', 'mod3max');
    UpdateFrequency(row, rows);
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
  [
    'global\\excel\\magicprefix.txt',
    'global\\excel\\base\\magicprefix.txt',
    'global\\excel\\magicsuffix.txt',
    'global\\excel\\base\\magicsuffix.txt',
  ].forEach((fileName) => {
    const fileContent = D2RMM.readTsv(fileName);
    if (!fileContent) return;
    SplitAffixesIntoOneAffixPerItemType(fileContent.rows, 1000);
    CalculateAffixTierMap(fileContent.rows);
    fileContent.rows.forEach(adjustAffixRow);
    D2RMM.writeTsv(fileName, fileContent);
  });
}

if (config.defense) {
  ['global\\excel\\armor.txt', 'global\\excel\\base\\armor.txt'].forEach(
    (fileName) => {
      const fileContent = D2RMM.readTsv(fileName);
      if (!fileContent) return;
      fileContent.rows.forEach((row) => {
        if (+row.maxac > +row.minac) {
          row.minac = row.maxac;
        }
      });
      D2RMM.writeTsv(fileName, fileContent);
    },
  );
}

if (config.crafted) {
  ['global\\excel\\cubemain.txt', 'global\\excel\\base\\cubemain.txt'].forEach(
    (fileName) => {
      const fileContent = D2RMM.readTsv(fileName);
      if (!fileContent) return;
      fileContent.rows.forEach((row) => {
        if (row.output === '"usetype,crf"') {
          UpdateRow(row, 'mod 1', 'mod 1 min', 'mod 1 max');
          UpdateRow(row, 'mod 2', 'mod 2 min', 'mod 2 max');
          UpdateRow(row, 'mod 3', 'mod 3 min', 'mod 3 max');
          UpdateRow(row, 'mod 4', 'mod 4 min', 'mod 4 max');
          UpdateRow(row, 'mod 5', 'mod 5 min', 'mod 5 max');
        }
      });
      D2RMM.writeTsv(fileName, fileContent);
    },
  );
}
