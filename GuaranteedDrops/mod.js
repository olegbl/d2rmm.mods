const treasureclassexFilename = 'global\\excel\\treasureclassex.txt';
const treasureclassex = D2RMM.readTsv(treasureclassexFilename);
treasureclassex.rows.forEach((row) => {
  const treasureClass = row['Treasure Class'];
  // not all rows are valid entries
  if (treasureClass !== '') {
    if (config.players === 0) {
      row.NoDrop = 0;
    } else if (row.NoDrop !== '') {
      const N =
        Math.floor(config.players) === +config.players
          ? // in vanilla D2, /players increases loot drops only at 1/3/5/7
            Math.ceil(config.players / 2)
          : // if the players arg has a decimal point, use a smoother transition
            (config.players + 1) / 2;

      // current values
      const NoDrop = +(row.NoDrop ?? 0) / 100;
      const ProbSum =
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].reduce(
          (acc, idx) => acc + +(row[`Prob${idx}`] ?? 0),
          0
        ) / 100;

      // https://www.purediablo.com/forums/threads/item-generation-tutorial.110/
      // NewNoDrop=int(ProbSum/(1/((NoDrop/(NoDrop+ProbSum))^N)-1))
      row.NoDrop = Math.floor(
        (ProbSum / (1 / (NoDrop / (NoDrop + ProbSum)) ** N - 1)) * 100
      );
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
