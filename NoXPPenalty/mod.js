const experienceFilename = 'global\\excel\\experience.txt';
const experience = D2RMM.readTsv(experienceFilename);

for (let row = 71; row <= 100; row++) {
  experience.rows[row]['ExpRatio\r'] = 1024;
}
D2RMM.writeTsv(experienceFilename, experience);
