const COLOR_PREFIX = 'ÿc';

const ITEMS = [
  {
    id: 'AMETHYST',
    color: `${COLOR_PREFIX};`,
    codes: ['gcv', 'gfv', 'gsv', 'gzv', 'gpv'],
  },
  {
    id: 'DIAMOND',
    color: `${COLOR_PREFIX}5`,
    codes: ['gcw', 'gfw', 'gsw', 'glw', 'gpw'],
  },
  {
    id: 'EMERALD',
    color: `${COLOR_PREFIX}2`,
    codes: ['gcg', 'gfg', 'gsg', 'glg', 'gpg'],
  },
  {
    id: 'RUBY',
    color: `${COLOR_PREFIX}1`,
    codes: ['gcr', 'gfr', 'gsr', 'glr', 'gpr'],
  },
  {
    id: 'SAPPHIRE',
    color: `${COLOR_PREFIX}3`,
    codes: ['gcb', 'gfb', 'gsb', 'glb', 'gpb'],
  },
  {
    id: 'SKULL',
    color: `${COLOR_PREFIX}5`,
    codes: ['skc', 'skf', 'sku', 'skl', 'skz'],
  },
  {
    id: 'TOPAZ',
    color: `${COLOR_PREFIX}9`,
    codes: ['gcy', 'gfy', 'gsy', 'gly', 'gpy'],
  },
];

function processItem(item) {
  const itemtype = item.Key;

  let newName = null;

  ITEMS.forEach(({ id, color, codes }) => {
    const quality = codes.indexOf(itemtype) + 1;
    if (quality > 0) {
      newName = color + (id === 'SKULL' ? 'Skull ' : 'Gem ') + quality;
    }
  });

  if (newName != null) {
    // update all localizations
    for (const key in item) {
      if (key !== 'id' && key !== 'Key') {
        item[key] = newName;
      }
    }
  }
}

const itemNamesFilename = 'local\\lng\\strings\\item-names.json';
const itemNames = D2RMM.readJson(itemNamesFilename);
itemNames.forEach(processItem);
D2RMM.writeJson(itemNamesFilename, itemNames);

const itemNameAffixesFilename = 'local\\lng\\strings\\item-nameaffixes.json';
const itemNameAffixes = D2RMM.readJson(itemNameAffixesFilename);
itemNameAffixes.forEach(processItem);
D2RMM.writeJson(itemNameAffixesFilename, itemNameAffixes);
