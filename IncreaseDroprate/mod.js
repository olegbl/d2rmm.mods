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
  const { equipmentChance, equipmentMin } = config;
  const treasureclassexFilename = 'global\\excel\\itemratio.txt';
  const treasureclassex = D2RMM.readTsv(treasureclassexFilename);
  treasureclassex.rows.forEach((row) => {
    row.Unique = Math.max(1, Math.floor(row.Unique / equipmentChance));
    row.UniqueMin = Math.max(1, Math.floor(row.UniqueMin / equipmentMin));

    row.Set = Math.max(1, Math.floor(row.Set / equipmentChance));
    row.SetMin = Math.max(1, Math.floor(row.SetMin / equipmentMin));

    row.Rare = Math.max(1, Math.floor(row.Rare / equipmentChance));
    row.RareMin = Math.max(1, Math.floor(row.RareMin / equipmentMin));

    row.Magic = Math.max(1, Math.floor(row.Magic / equipmentChance));
    row.MagicMin = Math.max(1, Math.floor(row.MagicMin / equipmentMin));
  });
  D2RMM.writeTsv(treasureclassexFilename, treasureclassex);
}
