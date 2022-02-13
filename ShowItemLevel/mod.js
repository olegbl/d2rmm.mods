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

if (config.jewelry || config.charms) {
  const miscFilename = 'global\\excel\\misc.txt';
  const misc = D2RMM.readTsv(miscFilename);
  misc.rows.forEach((row) => {
    if (config.jewelry && ['amu', 'rin'].indexOf(row.code) !== -1) {
      row.ShowLevel = 1;
    }
    if (config.charms && ['cm1', 'cm2', 'cm3'].indexOf(row.code) !== -1) {
      row.ShowLevel = 1;
    }
  });
  D2RMM.writeTsv(miscFilename, misc);
}
