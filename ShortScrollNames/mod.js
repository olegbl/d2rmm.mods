const COLOR_PREFIX = 'ÿc';
const COLOR_GRAY = `${COLOR_PREFIX}5`;

const itemNamesFilename = 'local\\lng\\strings\\item-names.json';
const itemNames = D2RMM.readJson(itemNamesFilename);
itemNames.forEach((item) => {
  const itemtype = item.Key;
  let newName = null;

  // Scroll of Town Portal
  if (itemtype === 'tsc') {
    newName = `${COLOR_GRAY}TP`;
  }

  // Scroll of Identify
  if (itemtype === 'isc') {
    newName = `${COLOR_GRAY}ID`;
  }

  if (newName != null) {
    // update all localizations
    for (const key in item) {
      if (key !== 'id' && key !== 'Key') {
        item[key] = newName;
      }
    }
  }
});
D2RMM.writeJson(itemNamesFilename, itemNames);
