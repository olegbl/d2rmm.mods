if (config.runes) {
  const treasureclassexFilename = 'global\\excel\\treasureclassex.txt';
  const treasureclassex = D2RMM.readTsv(treasureclassexFilename);
  treasureclassex.rows.forEach((row) => {
    const treasureClass = row['Treasure Class'];
    if (treasureClass.match(/^Runes [1-9][0-9]?$/) != null) {
      const groupNumber = +treasureClass.replace(/^Runes ([1-9][0-9]?)$/, '$1');
      if (groupNumber > 1) {
        const restGroupColumn = groupNumber < 17 ? 'Prob3' : 'Prob2';

        row[restGroupColumn] = Math.floor(
          Math.max(
            row[restGroupColumn] / config.runesScaling,
            2 * Math.sqrt(config.runesScaling)
          )
        );
      }
    }
  });
  D2RMM.writeTsv(treasureclassexFilename, treasureclassex);
}

if (config.equipment) {
  const treasureclassexFilename = 'global\\excel\\itemratio.txt';
  const treasureclassex = D2RMM.readTsv(treasureclassexFilename);
  treasureclassex.rows.forEach((row) => {
    row.Unique = Math.round(100 / config.unique);
    row.Set = Math.round(100 / config.set);
    row.Rare = Math.round(100 / config.rare);
    row.Magic = Math.round(100 / config.magic);
    row.HiQuality = Math.round(100 / config.hiquality);

    if (config.disableminimumrarity) {
      row.UniqueMin = 1;
      row.SetMin = 1;
      row.RareMin = 1;
      row.MagicMin = 1;
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
  D2RMM.writeTsv(treasureclassexFilename, treasureclassex);
}
