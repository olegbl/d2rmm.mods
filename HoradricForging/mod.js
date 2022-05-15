const cubemainFilename = 'global\\excel\\cubemain.txt';
const cubemain = D2RMM.readTsv(cubemainFilename);

const RARITY_LABEL = {
  low: 'low quality',
  nor: 'normal quality',
  hiq: 'high quality',
  mag: 'magic',
  rar: 'rare',
  uni: 'unique',
  set: 'set',
  crf: 'crafted',
  tmp: 'tempered',
};

const ETHEREAL_LABEL = {
  eth: 'ethereal',
  noe: 'normal',
};

const TYPE_LABEL = {
  armo: 'armor',
  weap: 'weapon',
  ring: 'ring',
  amul: 'amulet',
  scha: 'small charm',
  mcha: 'large charm',
  lcha: 'grand charm',
  jewl: 'jewel',
};

const VALID_TYPES = {
  low: ['armo', 'weap'],
  nor: ['armo', 'weap'],
  hiq: ['armo', 'weap'],
  mag: ['armo', 'weap', 'ring', 'amul', 'scha', 'mcha', 'lcha', 'jewl'],
  rar: ['armo', 'weap', 'ring', 'amul', 'scha', 'mcha', 'lcha', 'jewl'],
  uni: ['armo', 'weap', 'ring', 'amul', 'scha', 'mcha', 'lcha', 'jewl'],
  set: ['armo', 'weap', 'ring', 'amul'],
  crf: ['armo', 'weap', 'ring', 'amul'],
  tmp: ['armo', 'weap', 'ring', 'amul'],
  eth: ['armo','weap'],
};

if (config.reforge) {
  const rune = config.reforgeIngredient;

  ['eth', 'noe'].forEach(
  (etherealType) => {
	const etherealLabel = ETHEREAL_LABEL[etherealType];
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
          description: `Convert ${etherealLabel} ${fromRarityLabel} ${typeLabel} to ${toRarityLabel}`,
          enabled: 1,
          version: 100,
          numinputs: 2,
          'input 1': `${type},${etherealType},${fromRarity}`,
          'input 2': rune,
          output: `usetype,${etherealType},${toRarity}`,
          ilvl: 100, // preserve item level
          '*eol\n': 0,
        };
        if (config.freeReforge) {
          recipe['output b'] = rune;
        }
        cubemain.rows.push(recipe);
      });
    });
  });
}

if (config.ethereal) {
  const rune = config.etherealIngredient;

  [
    ['eth', 'noe'],
    ['noe', 'eth'],
  ].forEach(([ethFrom, ethTo]) => {
	const ethFromLabel = ETHEREAL_LABEL[ethFrom];
    const ethToLabel = ETHEREAL_LABEL[ethTo];
    ['low', 'nor', 'hiq', 'mag', 'rar', 'uni', 'set', 'crf', 'tmp'].forEach(
      (rarity) => {
        const rarityLabel = RARITY_LABEL[rarity];
        VALID_TYPES['eth'].forEach((type) => {
          const typeLabel = TYPE_LABEL[type];
          const recipe = {
            description: `Convert ${ethFromLabel} ${rarityLabel} ${typeLabel} to ${ethToLabel}`,
            enabled: 1,
            version: 100,
            numinputs: 2,
            'input 1': `${type},${rarity},${ethFrom}`,
            'input 2': rune,
            output: `usetype,${rarity},${ethTo}`,
            ilvl: 100, // preserve item level
            '*eol\n': 0,
          };
          if (config.freeReforge) {
            recipe['output b'] = rune;
          }
          cubemain.rows.push(recipe);
        });
      }
    );
  });
}

if (config.reroll) {
  const rune = config.rerollIngredient;

  ['eth', 'noe'].forEach(
  (etherealType) => {
	const etherealLabel = ETHEREAL_LABEL[etherealType];
    ['low', 'nor', 'hiq', 'mag', 'rar', 'uni', 'set', 'crf', 'tmp'].forEach(
      (rarity) => {
        const rarityLabel = RARITY_LABEL[from];
        VALID_TYPES[rarity].forEach((type) => {
          const typeLabel = TYPE_LABEL[type];
          const recipe = {
            description: `Reroll stats of ${etherealLabel} ${rarityLabel} ${typeLabel}`,
            enabled: 1,
            version: 100,
            numinputs: 2,
            'input 1': `${type},${rarity},${etherealType}`,
            'input 2': rune,
            output: `usetype,${rarity},${etherealType}`,
            ilvl: 100, // preserve item level
            '*eol\n': 0,
          };
          if (true) {
            recipe['output b'] = rune;
          }
          cubemain.rows.push(recipe);
        });
      }
    )
  });
}

if (config.relevel) {
  ['eth', 'noe'].forEach(
  (etherealType) => {
	const etherealLabel = ETHEREAL_LABEL[etherealType];
    [
      [config.relevelIngredient25, 25],
      [config.relevelIngredient40, 40],
      [config.relevelIngredient99, 99],
    ].forEach(([rune, lvl]) => {
      ['low', 'nor', 'hiq', 'mag', 'rar', 'uni', 'set', 'crf', 'tmp'].forEach(
        (rarity) => {
          const rarityLabel = RARITY_LABEL[from];
          VALID_TYPES[rarity].forEach((type) => {
            const typeLabel = TYPE_LABEL[type];
            const recipe = {
              description: `Set item level of ${etherealLabel} ${rarityLabel} ${typeLabel} to ${lvl}`,
              enabled: 1,
              version: 100,
              numinputs: 2,
              'input 1': `${type},${etherealType},${rarity}`,
              'input 2': rune,
              output: `usetype,${etherealType},${rarity}`,
              lvl,
              '*eol\n': 0,
            };
            if (config.freeRelevel) {
              recipe['output b'] = rune;
            }
            cubemain.rows.push(recipe);
          });
        }
      );
    });
  });
}

D2RMM.writeTsv(cubemainFilename, cubemain);
