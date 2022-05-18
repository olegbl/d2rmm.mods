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
  noe: 'non-ethereal',
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

const VALID_TYPES_FOR_RARITY = {
  low: ['armo', 'weap'],
  nor: ['armo', 'weap'],
  hiq: ['armo', 'weap'],
  mag: ['armo', 'weap', 'ring', 'amul', 'scha', 'mcha', 'lcha', 'jewl'],
  rar: ['armo', 'weap', 'ring', 'amul', 'scha', 'mcha', 'lcha', 'jewl'],
  uni: ['armo', 'weap', 'ring', 'amul', 'scha', 'mcha', 'lcha', 'jewl'],
  set: ['armo', 'weap', 'ring', 'amul'],
  crf: ['armo', 'weap', 'ring', 'amul'],
  tmp: ['armo', 'weap', 'ring', 'amul'],
};

function getEtherealValues(type, rarity) {
  if (
    ['armo', 'weap'].includes(type) &&
    ['low', 'nor', 'hiq', 'mag', 'rar', 'uni', 'crf', 'tmp'].includes(rarity)
  ) {
    return ['eth', 'noe'];
  }
  return ['noe'];
}

if (config.reforge) {
  const rune = config.reforgeIngredient;

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
    VALID_TYPES_FOR_RARITY[fromRarity].forEach((type) => {
      const typeLabel = TYPE_LABEL[type];
      getEtherealValues(type, fromRarity).forEach((ethereal) => {
        const etherealLabel = ETHEREAL_LABEL[ethereal];
        const recipe = {
          description: `Convert ${fromRarityLabel} ${etherealLabel} ${typeLabel} to ${toRarityLabel}`,
          enabled: 1,
          version: 100,
          numinputs: 2,
          'input 1': `${type},${fromRarity},${ethereal}`,
          'input 2': rune,
          output: `usetype,${toRarity},${ethereal}`,
          ilvl: 100, // preserve item level
          '*eol\r': 0,
        };
        if (config.freeReforge) {
          recipe['output b'] = rune;
        }
        cubemain.rows.push(recipe);
      });
    });
  });
}

if (config.reroll) {
  const rune = config.rerollIngredient;

  ['low', 'nor', 'hiq', 'mag', 'rar', 'uni', 'set', 'crf', 'tmp'].forEach(
    (rarity) => {
      const rarityLabel = RARITY_LABEL[rarity];
      VALID_TYPES_FOR_RARITY[rarity].forEach((type) => {
        const typeLabel = TYPE_LABEL[type];
        getEtherealValues(type, rarity).forEach((ethereal) => {
          const etherealLabel = ETHEREAL_LABEL[ethereal];
          const recipe = {
            description: `Reroll stats of ${etherealLabel} ${rarityLabel} ${typeLabel}`,
            enabled: 1,
            version: 100,
            numinputs: 2,
            'input 1': `${type},${rarity},${ethereal}`,
            'input 2': rune,
            output: `useitem${ethereal === 'eth' ? ',eth' : ''},reg`,
            '*eol\r': 0,
          };
          if (config.freeReroll) {
            recipe['output b'] = rune;
          }
          cubemain.rows.push(recipe);
        });
      });
    }
  );
}

if (config.ethereal) {
  const rune = config.etherealIngredient;

  ['low', 'nor', 'hiq', 'mag', 'rar', 'uni', 'crf', 'tmp'].forEach((rarity) => {
    const rarityLabel = RARITY_LABEL[rarity];
    VALID_TYPES_FOR_RARITY[rarity]
      .filter((type) => getEtherealValues(type, rarity).length > 1)
      .forEach((type) => {
        const typeLabel = TYPE_LABEL[type];
        getEtherealValues(type, rarity).forEach((fromEthereal) => {
          const toEthereal = fromEthereal === 'eth' ? 'noe' : 'eth';
          const fromEtherealLabel = ETHEREAL_LABEL[fromEthereal];
          const toEtherealLabel = ETHEREAL_LABEL[toEthereal];
          let recipe = {
            description: `Toggle ethereal status of ${fromEtherealLabel} ${rarityLabel} ${typeLabel} to ${toEtherealLabel}`,
            enabled: 1,
            version: 100,
            numinputs: 2,
            'input 1': `${type},${rarity},${fromEthereal}`,
            'input 2': rune,
            output: `usetype,${rarity},${toEthereal}`,
            ilvl: 100, // preserve item level
            '*eol\r': 0,
          };
          // if we're making the item ethereal, there's a special property we can use
          // that allows us to use "useitem" rather than "usetype" and thus preserve
          // the item's mods, sockets, etc...
          // unfortunately, nothing like this exists for turning an item non-ethereal
          if (fromEthereal === 'noe') {
            recipe = {
              ...recipe,
              output: 'useitem',
              'mod 1': 'ethereal',
              'mod 1 min': 1,
              'mod 1 max': 1,
            };
          }
          if (config.freeEthereal) {
            recipe['output b'] = rune;
          }
          cubemain.rows.push(recipe);
        });
      });
  });
}

if (config.relevel) {
  [
    [config.relevelIngredient25, 25],
    [config.relevelIngredient40, 40],
    [config.relevelIngredient99, 99],
  ].forEach(([rune, lvl]) => {
    ['low', 'nor', 'hiq', 'mag', 'rar', 'uni', 'set', 'crf', 'tmp'].forEach(
      (rarity) => {
        const rarityLabel = RARITY_LABEL[rarity];
        VALID_TYPES_FOR_RARITY[rarity].forEach((type) => {
          const typeLabel = TYPE_LABEL[type];
          getEtherealValues(type, rarity).forEach((etherealType) => {
            const etherealLabel = ETHEREAL_LABEL[etherealType];
            const recipe = {
              description: `Set item level of ${etherealLabel} ${rarityLabel} ${typeLabel} to ${lvl}`,
              enabled: 1,
              version: 100,
              numinputs: 2,
              'input 1': `${type},${etherealType},${rarity}`,
              'input 2': rune,
              output: `usetype,${etherealType},${rarity}`,
              lvl,
              '*eol\r': 0,
            };
            if (config.freeRelevel) {
              recipe['output b'] = rune;
            }
            cubemain.rows.push(recipe);
          });
        });
      }
    );
  });
}

D2RMM.writeTsv(cubemainFilename, cubemain);

if (config.nolimit || config.nolevel) {
  const uniqueitemsFilename = 'global\\excel\\uniqueitems.txt';
  const uniqueitems = D2RMM.readTsv(uniqueitemsFilename);
  uniqueitems.rows.forEach((row) => {
    if (config.nolevel && row.lvl > 99 && row['lvl req'] <= 99) {
      row.lvl = row['lvl req'];
    }
    if (config.nolimit) {
      row.nolimit = 1;
    }
  });
  D2RMM.writeTsv(uniqueitemsFilename, uniqueitems);
}
