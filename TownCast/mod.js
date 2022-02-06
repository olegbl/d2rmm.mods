const skillsFilename = 'global\\excel\\skills.txt';
const skills = D2RMM.readTsv(skillsFilename);
skills.rows.forEach((row) => {
  if (
    row.charclass !== '' &&
    row.passive === '' &&
    (config.allskills ||
      [
        'Armageddon',
        'Battle Command',
        'Battle Orders',
        'Charge',
        'Hurricane',
        'Leap',
        'Shout',
        'Teleport',
        'Thunder Storm',
      ].indexOf(row.skill) !== -1)
  ) {
    row.InTown = 1;
  }
});
D2RMM.writeTsv(skillsFilename, skills);
