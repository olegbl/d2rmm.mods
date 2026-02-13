['global\\excel\\misc.txt', 'global\\excel\\base\\misc.txt'].forEach(
  (fileName) => {
    const fileContent = D2RMM.readTsv(fileName);
    if (!fileContent) return;
    fileContent.rows.forEach((row) => {
      if (
        row.code === 'tbk' || // Tome of Town Portal
        row.code === 'ibk' // Tome of Identify
      ) {
        row.maxstack = config.tomes;
      }
      if (
        row.code === 'aqv' || // Arrows
        row.code === 'cqv' // Bolts
      ) {
        row.maxstack = config.projectiles;
      }
      if (
        row.code === 'key' // Key
      ) {
        row.maxstack = config.keys;
      }
    });
    D2RMM.writeTsv(fileName, fileContent);
  },
);

['global\\excel\\weapons.txt', 'global\\excel\\base\\weapons.txt'].forEach(
  (fileName) => {
    const fileContent = D2RMM.readTsv(fileName);
    if (!fileContent) return;
    fileContent.rows.forEach((row) => {
      if (
        // don't modify throwing potions (gas, oil pots)
        row.type !== 'tpot' &&
        // only modify throwing weapons
        row.stackable === '1'
      ) {
        row.minstack = config.throwingweapons;
        row.maxstack = config.throwingweapons;
        row.spawnstack = config.throwingweapons;
      }
    });
    D2RMM.writeTsv(fileName, fileContent);
  },
);
