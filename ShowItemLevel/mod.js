if (config.weapons) {
  ['global\\excel\\weapons.txt', 'global\\excel\\base\\weapons.txt'].forEach(
    (miscFilename) => {
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
    },
  );
}

if (config.armor) {
  ['global\\excel\\armor.txt', 'global\\excel\\base\\armor.txt'].forEach(
    (miscFilename) => {
      const misc = D2RMM.readTsv(miscFilename);
      misc.rows.forEach((row) => {
        row.ShowLevel = 1;
      });
      D2RMM.writeTsv(miscFilename, misc);
    },
  );
}

if (config.jewelry || config.charms || config.jewels) {
  ['global\\excel\\misc.txt', 'global\\excel\\base\\misc.txt'].forEach(
    (miscFilename) => {
      const misc = D2RMM.readTsv(miscFilename);
      misc.rows.forEach((row) => {
        if (config.jewelry && ['amu', 'rin'].indexOf(row.code) !== -1) {
          row.ShowLevel = 1;
        }
        if (config.charms && ['cm1', 'cm2', 'cm3'].indexOf(row.code) !== -1) {
          row.ShowLevel = 1;
        }
        if (config.jewels && ['jew'].indexOf(row.code) !== -1) {
          row.ShowLevel = 1;
        }
      });
      D2RMM.writeTsv(miscFilename, misc);
    },
  );
}
