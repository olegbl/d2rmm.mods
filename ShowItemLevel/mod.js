if (config.weapons) {
  const miscFilename = 'global\\excel\\weapons.txt';
  const misc = D2RMM.readTsv(miscFilename);
  misc.rows.forEach((row) => {
    if (
      // don't modify throwing potions (gas, oil pots)
      row.type !== 'tpot'
    ) {
      row.ShowLevel = 1;
    }
  });
  D2RMM.writeTsv(miscFilename, misc);
}

if (config.armor) {
  const miscFilename = 'global\\excel\\armor.txt';
  const misc = D2RMM.readTsv(miscFilename);
  misc.rows.forEach((row) => {
    row.ShowLevel = 1;
  });
  D2RMM.writeTsv(miscFilename, misc);
}

if (config.jewelry) {
  const miscFilename = 'global\\excel\\misc.txt';
  const misc = D2RMM.readTsv(miscFilename);
  misc.rows.forEach((row) => {
    if (row.code === 'amu' || row.code === 'rin') {
      row.ShowLevel = 1;
    }
  });
  D2RMM.writeTsv(miscFilename, misc);
}
