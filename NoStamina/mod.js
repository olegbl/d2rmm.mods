
if (config.stamdrain) {
  const charstatsFilename = 'global\\excel\\charstats.txt';
  const charstats = D2RMM.readTsv(charstatsFilename);
  charstats.rows.forEach((row) => {
    if (row.RunDrain !== '') {
      row.RunDrain = 0;
    }
  });
  D2RMM.writeTsv(charstatsFilename, charstats);
}

if (config.stamdrops) {
  const treasureclassexFilename = 'global\\excel\\treasureclassex.txt';
  const treasureclassex = D2RMM.readTsv(treasureclassexFilename);
  treasureclassex.rows.forEach((row) => {
    for (let col = 1; col <= 10; col++) {
      const item = `Item${col}`;
      if (row[item] === 'vps') {
        row[item] = 'gld';
      }
    }
  });
  D2RMM.writeTsv(treasureclassexFilename, treasureclassex);
}
