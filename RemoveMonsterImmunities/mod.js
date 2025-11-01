const DIFFICULTY_AFFIXES = ['', '(N)', '(H)'];
const ELEMENTAL_AFFIXES = ['Dm', 'Ma', 'Fi', 'Li', 'Co', 'Po'];

function negateMagicResistantAffix(row) {
  // https://d2mods.info/forum/viewtopic.php?t=37908
  // "Magic Resistant" checks the resistance (Cold, then Fire, then Lightning)
  // and if the resistance is below 100, it adds 40 to that resistance.
  // Once two resistances have been raised to 100 or above (immunity), the affix
  // stops affecting other resistances.
  for (const difficultyAffix of DIFFICULTY_AFFIXES) {
    let immuneCountNew = 0;
    let immuneCountOld = 0;
    for (const elementalAffix of ['Co', 'Fi', 'Li']) {
      const cell = `Res${elementalAffix}${difficultyAffix}`;
      if (row[cell] !== '' && +row[cell] < 100) {
        // negate the effect of the affix
        row[cell] = +row[cell] - 40;
        // if this affix will provide immunity during gameplay, count it
        // (theoretically, this should never happen per the design intent
        //  of the mod, but who am I to stop users who set maxres >= 100?)
        if (row[cell] + 40 >= 100) immuneCountNew++;
      }
      const cellOriginal = `Res${elementalAffix}${difficultyAffix}_Original`;
      if (row[cellOriginal] !== '' && +row[cellOriginal] < 100) {
        // if the original game would have given immunity, count it
        if (+row[cellOriginal] + 40 >= 100) immuneCountOld++;
      }
      if (immuneCountNew >= 2) break;
    }
    // *Technically*, if the user sets a low max resistance, then the early exit
    // after reaching 2 immunities will not trigger for some bosses and they
    // will have 40 more lightning resistance than without this mod.
    if (immuneCountOld >= 2 && immuneCountNew < 2) {
      // the original game would have given 2 immunities, but with our mod,
      // it didn't happen, so we need to negate the extra 40 Lightning Resistance
      // that the "Magic Resistant" affix will now provide
      const cell = `ResLi${difficultyAffix}`;
      if (row[cell] !== '') {
        row[cell] = +row[cell] - 40;
      }
    }
  }
}

function negateElementalEnchantedAffix(row, elementalAffix) {
  // https://d2mods.info/forum/viewtopic.php?t=37908
  // "Cold Enchanted" adds 75 to Cold Resistance
  for (const difficultyAffix of DIFFICULTY_AFFIXES) {
    const cell = `Res${elementalAffix}${difficultyAffix}`;
    if (row[cell] !== '' && +row[cell] < 100) {
      // negate the effect of the affix
      row[cell] = +row[cell] - 75;
    }
  }
}

const monstatsFilename = 'global\\excel\\monstats.txt';
const monstats = D2RMM.readTsv(monstatsFilename);
monstats.rows.forEach((row) => {
  // we modify the maximum resistance *before* handling bosses
  ELEMENTAL_AFFIXES.forEach((elementalAffix) => {
    DIFFICULTY_AFFIXES.forEach((difficultyAffix) => {
      const cell = `Res${elementalAffix}${difficultyAffix}`;
      if (row[cell] !== '') {
        // cache the original value (this won't be written back to the TSV)
        // so that it can later be used to counteract "Magic Resistant" for bosses
        row[cell + '_Original'] = row[cell];
        row[cell] = Math.min(config.maxres, +row[cell]);
      }
    });
  });
  // Bosses and Uber bosses have hard coded affixes that are not
  // modifiable by mods so we have to account for them manually instead
  // Uber Andariel (Lilith)
  if (config.adjustbosses) {
    if (row.Id === 'uberandariel') {
      // https://classic.battle.net/diablo2exp/monsters/act5-uberandariel.shtml
      // Uber Andariel is Poison Enchanted
      negateElementalEnchantedAffix(row, 'Po');
    }
    // Uber Duriel
    if (row.Id === 'uberduriel') {
      // https://classic.battle.net/diablo2exp/monsters/act5-uberduriel.shtml
      // Uber Duriel is Cold Enchanted
      negateElementalEnchantedAffix(row, 'Co');
    }
    // Uber Mephisto
    if (row.Id === 'ubermephisto') {
      // https://classic.battle.net/diablo2exp/monsters/act5-ubermephisto.shtml
      // Uber Mephisto is Magic Resistant and Lightning Enchanted
      negateMagicResistantAffix(row);
      negateElementalEnchantedAffix(row, 'Li');
    }
    // Uber Diablo
    if (row.Id === 'uberdiablo') {
      // https://classic.battle.net/diablo2exp/monsters/act5-pandiablo.shtml
      // Uber Diablo doesn't have special affixes?
    }
    // Uber Baal
    if (row.Id === 'uberbaal') {
      // https://classic.battle.net/diablo2exp/monsters/act5-uberbaal.shtml
      // Uber Baal is Magic Resistant and Cold Enchanted
      negateMagicResistantAffix(row);
      negateElementalEnchantedAffix(row, 'Co');
    }
    // Uber Izual
    if (row.Id === 'uberizual') {
      // https://classic.battle.net/diablo2exp/monsters/act5-uberizual.shtml
      // Uber Izual is Cold Enchanted
      negateElementalEnchantedAffix(row, 'Co');
    }
    if (row.Id === 'diabloclone') {
      // https://classic.battle.net/diablo2exp/monsters/act5-uberdiablo.shtml
      // Diablo Clone doesn't have special affixes?
    }
  }
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
