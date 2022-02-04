const COLOR_PREFIX = 'ÿc';
const COLOR_ORANGE = `${COLOR_PREFIX}8`;

const itemRunesFilename = 'local\\lng\\strings\\item-runes.json';
const itemRunes = D2RMM.readJson(itemRunesFilename);
itemRunes.forEach((item) => {
  const itemtype = item.Key;
  if (itemtype.match(/^r[0-9]{2}$/) != null) {
    // update all localizations
    for (const key in item) {
      if (key !== 'id' && key !== 'Key') {
        item[key] = `${COLOR_ORANGE}${item[key]}`;
      }
    }
  }
});
D2RMM.writeJson(itemRunesFilename, itemRunes);
