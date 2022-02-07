const levelsFilename = 'global\\excel\\levels.txt';
const levels = D2RMM.readTsv(levelsFilename);
levels.rows.forEach((row) => {
  // multiply number of packs spawned
  if (row.MonDen !== '') {
    row.MonDen = Math.floor(row.MonDen * config.multiplier);
    row['MonDen(N)'] = Math.floor(row['MonDen(N)'] * config.multiplier);
    row['MonDen(H)'] = Math.floor(row['MonDen(H)'] * config.multiplier);
  }

  // multiply minimum number of unique/champion monsters
  if (row.MonUMin !== '') {
    row.MonUMin = Math.floor(row.MonUMin * config.multiplier);
    row['MonUMin(N)'] = Math.floor(row['MonUMin(N)'] * config.multiplier);
    row['MonUMin(H)'] = Math.floor(row['MonUMin(H)'] * config.multiplier);
  }

  // multiply maximum number of unique/champion monsters
  if (row.MonUMax !== '') {
    row.MonUMax = Math.floor(row.MonUMax * config.multiplier);
    row['MonUMax(N)'] = Math.floor(row['MonUMax(N)'] * config.multiplier);
    row['MonUMax(H)'] = Math.floor(row['MonUMax(H)'] * config.multiplier);
  }
});
D2RMM.writeTsv(levelsFilename, levels);
