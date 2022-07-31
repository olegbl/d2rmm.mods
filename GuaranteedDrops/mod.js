const treasureclassexFilename = 'global\\excel\\treasureclassex.txt';
const treasureclassex = D2RMM.readTsv(treasureclassexFilename);
treasureclassex.rows.forEach((row) => {
  const treasureClass = row['Treasure Class'];
  // not all rows are valid entries
  if (treasureClass !== '') {
    if (config.players === 0) {
      row.NoDrop = 0;
    } else if (row.NoDrop !== '') {
      const originalNoDropRatio = +row.NoDrop / 100;
      // on /players 2, no drop chance is nodrop*nodrop
      const modifiedNoDropRatio = originalNoDropRatio ** config.players;
      const modifiedNoDrop = modifiedNoDropRatio * 100;
      const modifiedNoDropInt = +`${modifiedNoDrop}`.replace(/\..*$/, '');
      row.NoDrop = modifiedNoDropInt;
    }

    // fix Countess items if necessary
    if (config.fixcountess) {
      if (
        treasureClass === 'Countess' ||
        treasureClass === 'Countess (N)' ||
        treasureClass === 'Countess (H)'
      ) {
        // swap the order of 'Countess Rune' and 'Countess Item' to make
        // the countess prefer to drop runes over items
        const item1 = row.Item1;
        const item2 = row.Item2;
        row.Item1 = item2;
        row.Item2 = item1;
      }
    }
  }
});
D2RMM.writeTsv(treasureclassexFilename, treasureclassex);
