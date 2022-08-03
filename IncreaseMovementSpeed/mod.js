const charstatsFilename = 'global\\excel\\charstats.txt';
const charstats = D2RMM.readTsv(charstatsFilename);
charstats.rows.forEach((row) => {
  if (row.WalkVelocity !== '') {
    row.WalkVelocity = config.walk;
  }
  if (row.RunVelocity !== '') {
    row.RunVelocity = config.run;
  }
});
D2RMM.writeTsv(charstatsFilename, charstats);
