const runesFilename = 'global\\excel\\runes.txt';
const runes = D2RMM.readTsv(runesFilename);
runes.rows.forEach((row) => {
  // https://d2mods.info/forum/kb/viewarticle?a=388
  row.server = '';

  // version 2.6 got rid of "server" column and replaced it with these:
  row.firstLadderSeason = '';
  row.lastLadderSeason = '';
});
D2RMM.writeTsv(runesFilename, runes);
