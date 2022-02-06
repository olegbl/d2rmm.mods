if (config.items) {
  const miscFilename = 'global\\excel\\misc.txt';
  const misc = D2RMM.readTsv(miscFilename);
  misc.rows.forEach((row) => {
    if (
      row.code === 'tbk' || // Tome of Town Portal
      row.code === 'ibk' || // Tome of Identify
      row.code === 'aqv' || // Arrows
      row.code === 'cqb' || // Bolts
      row.code === 'key' // Key
    ) {
      row.maxstack = 500;
    }
  });
  D2RMM.writeTsv(miscFilename, misc);
}

if (config.weapons) {
  const weaponsFilename = 'global\\excel\\weapons.txt';
  const weapons = D2RMM.readTsv(weaponsFilename);
  weapons.rows.forEach((row) => {
    if (
      // don't modify throwing potions (gas, oil pots)
      row.type !== 'tpot' &&
      // only modify throwing weapons
      row.stackable === '1'
    ) {
      row.minstack = 500;
      row.maxstack = 500;
      row.spawnstack = 500;
    }
  });
  D2RMM.writeTsv(weaponsFilename, weapons);
}
