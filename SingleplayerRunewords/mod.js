const runesFilename = 'global\\excel\\runes.txt';
const runes = D2RMM.readTsv(runesFilename);
runes.rows.forEach((row) => {
  // https://d2mods.info/forum/kb/viewarticle?a=388
  row.server = '';
});
D2RMM.writeTsv(runesFilename, runes);
