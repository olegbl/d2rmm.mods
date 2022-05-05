const cubemainFilename = 'global\\excel\\cubemain.txt';
const cubemain = D2RMM.readTsv(cubemainFilename);

const RARITY_LABEL = {
  low: 'low quality',
  nor: 'normal quality',
  hiq: 'high quality',
  mag: 'magic',
  rar: 'rare',
  crf: 'crafted',
  tmp: 'tempered',
};

const TYPE_LABEL = {
  armo: 'armor',
  weap: 'weapon',
  ring: 'ring',
  amul: 'amulet',
};

// rings and amulets cannot be white
const VALID_TYPES = {
  low: ['armo', 'weap'],
  nor: ['armo', 'weap'],
  hiq: ['armo', 'weap'],
  mag: ['armo', 'weap', 'ring', 'amul'],
  rar: ['armo', 'weap', 'ring', 'amul'],
  crf: ['armo', 'weap', 'ring', 'amul'],
  tmp: ['armo', 'weap', 'ring', 'amul'],
};

if (config.reforge) {
  // TODO: allow customizing rune?
  const rune = 'r14'; // dol run

  [
    ['low', 'nor'],
    ['nor', 'hiq'],
    ['hiq', 'nor'],
    ['mag', 'nor'],
    ['rar', 'nor'],
    ['crf', 'nor'],
    ['tmp', 'nor'],
  ].forEach(([fromRarity, toRarity]) => {
    const fromRarityLabel = RARITY_LABEL[fromRarity];
    const toRarityLabel = RARITY_LABEL[toRarity];
    VALID_TYPES[fromRarity].forEach((type) => {
      const typeLabel = TYPE_LABEL[type];
      const recipe = {
        description: `Convert ${fromRarityLabel} ${typeLabel} to ${toRarityLabel}`,
        enabled: 1,
        version: 100,
        numinputs: 2,
        'input 1': `${type},${fromRarity}`,
        'input 2': rune,
        output: `usetype,${toRarity}`,
        ilvl: 100, // preserve item level
        '*eol\n': 0,
      };
      if (config.freeReforge) {
        recipe['output b'] = rune;
      }
      cubemain.rows.push(recipe);
    });
  });
}

if (config.reroll) {
  // TODO: allow customizing rune?
  const rune = 'r22'; // um run

  ['low', 'nor', 'hiq', 'mag', 'rar', 'crf', 'tmp'].forEach((rarity) => {
    const rarityLabel = RARITY_LABEL[from];
    VALID_TYPES[rarity].forEach((type) => {
      const typeLabel = TYPE_LABEL[type];
      const recipe = {
        description: `Reroll stats of ${rarityLabel} ${typeLabel}`,
        enabled: 1,
        version: 100,
        numinputs: 2,
        'input 1': `${type},${rarity}`,
        'input 2': rune,
        output: `usetype,${rarity}`,
        ilvl: 100, // preserve item level
        '*eol\n': 0,
      };
      if (config.freeReroll) {
        recipe['output b'] = rune;
      }
      cubemain.rows.push(recipe);
    });
  });
}

if (config.relevel) {
  // TODO: allow customizing rune?
  [
    ['r19', 25],
    ['r20', 40],
    ['r21', 99],
  ].forEach(([rune, lvl]) => {
    ['low', 'nor', 'hiq', 'mag', 'rar', 'crf', 'tmp'].forEach((rarity) => {
      const rarityLabel = RARITY_LABEL[from];
      VALID_TYPES[rarity].forEach((type) => {
        const typeLabel = TYPE_LABEL[type];
        const recipe = {
          description: `Set item level of ${rarityLabel} ${typeLabel} to ${lvl}`,
          enabled: 1,
          version: 100,
          numinputs: 2,
          'input 1': `${type},${rarity}`,
          'input 2': rune,
          output: `usetype,${rarity}`,
          lvl,
          '*eol\n': 0,
        };
        if (config.freeRelevel) {
          recipe['output b'] = rune;
        }
        cubemain.rows.push(recipe);
      });
    });
  });
}

D2RMM.writeTsv(cubemainFilename, cubemain);
