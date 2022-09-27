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

const monstatsFilename = 'global\\excel\\monstats.txt';
const monstats = D2RMM.readTsv(monstatsFilename);
monstats.rows.forEach((row) => {
  if (row.Id === 'bear' || row.Id === 'wolf') {
    row.Velocity = config.druidshapeshift;
  }
  if (row.Id === 'vampire5') {
    row.Velocity = row.Run = config.necrovampire;
  }
});
D2RMM.writeTsv(monstatsFilename, monstats);
