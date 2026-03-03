// Returns the value from either a preset select or a paired custom number field.
// Preset select values are the desired value as a string (e.g. "2.5", "10");
// "custom" means fall back to the paired number field.
function getPresetValue(preset, custom) {
  if (preset === 'custom') {
    return custom;
  }
  return parseFloat(preset);
}

// Converts a % chance to the itemratio.txt divisor value.
// Lower divisor = higher drop rate. 0% is treated as effectively impossible.
function processValue(value) {
  if (value === 0) {
    return 1000000000;
  }
  return Math.round(100 / value);
}

// Returns the minimum rarity floor for the itemratio.txt *Min column.
// 0% means disable that quality tier entirely (floor set to impossibly high).
// Any other value uses 1 (no meaningful floor — lets the chance scale freely).
function processMinValue(value) {
  if (value === 0) {
    return 1000000000;
  }
  return 1;
}

if (config.runes) {
  const runesScalingValue = getPresetValue(config.runesPreset, config.runesScaling);

  [
    'global\\excel\\treasureclassex.txt',
    'global\\excel\\base\\treasureclassex.txt',
  ].forEach((treasureclassexFilename) => {
    const treasureclassex = D2RMM.readTsv(treasureclassexFilename);
    treasureclassex.rows.forEach((row) => {
      const treasureClass = row['Treasure Class'];
      if (treasureClass.match(/^Runes [1-9][0-9]?$/) != null) {
        const groupNumber = +treasureClass.replace(
          /^Runes ([1-9][0-9]?)$/,
          '$1',
        );
        if (groupNumber > 1) {
          const restGroupColumn = groupNumber < 17 ? 'Prob3' : 'Prob2';

          row[restGroupColumn] = Math.floor(
            Math.max(
              row[restGroupColumn] / runesScalingValue,
              2 * Math.sqrt(runesScalingValue),
            ),
          );
        }
      }
    });
    D2RMM.writeTsv(treasureclassexFilename, treasureclassex);
  });
}

if (config.equipment) {
  const uniqueChance = getPresetValue(config.uniquePreset, config.unique);
  const setChance = getPresetValue(config.setPreset, config.set);
  const rareChance = getPresetValue(config.rarePreset, config.rare);
  const magicChance = getPresetValue(config.magicPreset, config.magic);
  const hiqualityChance = getPresetValue(config.hiqualityPreset, config.hiquality);

  [
    'global\\excel\\itemratio.txt',
    'global\\excel\\base\\itemratio.txt',
  ].forEach((itemratioFilename) => {
    const itemratio = D2RMM.readTsv(itemratioFilename);
    itemratio.rows.forEach((row) => {
      row.Unique = processValue(uniqueChance);
      row.Set = processValue(setChance);
      row.Rare = processValue(rareChance);
      row.Magic = processValue(magicChance);
      row.HiQuality = processValue(hiqualityChance);

      // Only disable the minimum rarity floor when level scaling is also
      // disabled. If level scaling is active, the scaling formula can drive
      // the quality divisor all the way to 1 (= 100% unique), and removing
      // the floor makes that worse. The UI enforces this via overrideValue,
      // but we also guard here for safety.
      if (config.disableminimumrarity && config.disablelevelscaling) {
        row.UniqueMin = processMinValue(uniqueChance);
        row.SetMin = processMinValue(setChance);
        row.RareMin = processMinValue(rareChance);
        row.MagicMin = processMinValue(magicChance);
      }

      if (config.disablelevelscaling) {
        row.UniqueDivisor = 1000000000;
        row.SetDivisor = 1000000000;
        row.RareDivisor = 1000000000;
        row.MagicDivisor = 1000000000;
        row.HiQualityDivisor = 1000000000;
        row.NormalDivisor = 1000000000;
      }
    });
    D2RMM.writeTsv(itemratioFilename, itemratio);
  });
}
