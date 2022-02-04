const itemRunesFilename = 'local\\lng\\strings\\item-runes.json';
const itemRunes = D2RMM.readJson(itemRunesFilename);
itemRunes.forEach((item) => {
  const itemtype = item.Key;
  if (itemtype.match(/^r[0-9]{2}$/) != null) {
    const runeNumber = itemtype.replace(/^r0?/, '');
    // update all localizations
    for (const key in item) {
      if (key !== 'id' && key !== 'Key') {
        item[key] = `${item[key]} (${runeNumber})`;
      }
    }
  }
});
D2RMM.writeJson(itemRunesFilename, itemRunes);
