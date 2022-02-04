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
