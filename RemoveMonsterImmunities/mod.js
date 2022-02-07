const DIFFICULTY_AFFIXES = ['', '(N)', '(H)'];
const ELEMENTAL_AFFIXES = ['Dm', 'Ma', 'Fi', 'Li', 'Co', 'Po'];

const monstatsFilename = 'global\\excel\\monstats.txt';
const monstats = D2RMM.readTsv(monstatsFilename);
monstats.rows.forEach((row) => {
  ELEMENTAL_AFFIXES.forEach((elementalAffix) => {
    DIFFICULTY_AFFIXES.forEach((difficultyAffix) => {
      const cell = `Res${elementalAffix}${difficultyAffix}`;
      if (row[cell] !== '') {
        row[cell] = Math.min(config.maxres, +row[cell]);
      }
    });
  });
});
D2RMM.writeTsv(monstatsFilename, monstats);

if (config.disableaffixes) {
  const disabledAffixes = [];
  const replacementAffixes = [];

  const monumodFilename = 'global\\excel\\monumod.txt';
  const monumod = D2RMM.readTsv(monumodFilename);
  monumod.rows.forEach((row) => {
    if (
      [
        // "Fire Enchanted" adds 75 fire resistance
        'fire',
        // "Lightning Enchanted" adds 75 lightning resistance
        'lightning',
        // "Cold Enchanted" adds 75 cold resistance
        'cold',
        // "Stone Skin" adds 50 physical resistance
        'stoneskin',
        // "Magic Resistant" adds 40 magic resistance
        'resist',
        // "Mana Burn" adds 20 magic resistance
        'manahit',
      ].indexOf(row.uniquemod) !== -1
    ) {
      row.enabled = 0;
      disabledAffixes.push(row.id);
    }

    if (
      [
        // "Aura Enchanted" is a nice, versatile affix that can end up buffing offense, defense or utility
        'aura',
        // Not a normal mod that can spawn, but increasing HP of unique enemies seems a reasonable compensation for decreasing their resistance
        'hpmultiply',
      ].indexOf(row.uniquemod) !== -1
    ) {
      replacementAffixes.push(row.id);
    }
  });
  D2RMM.writeTsv(monumodFilename, monumod);

  const superuniquesFilename = 'global\\excel\\superuniques.txt';
  const superuniques = D2RMM.readTsv(superuniquesFilename);
  superuniques.rows.forEach((row) => {
    if (disabledAffixes.indexOf(row.Mod1) !== -1) {
      row.Mod1 = replacementAffixes[0];
    }
    if (disabledAffixes.indexOf(row.Mod2) !== -1) {
      row.Mod2 = replacementAffixes[1];
    }
    if (disabledAffixes.indexOf(row.Mod3) !== -1) {
      row.Mod3 = 0;
    }
  });
  D2RMM.writeTsv(superuniquesFilename, superuniques);
}
