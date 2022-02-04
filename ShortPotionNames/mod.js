const COLOR_PREFIX = 'ÿc';
const COLOR_RED = `${COLOR_PREFIX}1`;
const COLOR_GREEN = `${COLOR_PREFIX}2`;
const COLOR_BLUE = `${COLOR_PREFIX}3`;
const COLOR_GRAY = `${COLOR_PREFIX}5`;
const COLOR_ORANGE = `${COLOR_PREFIX}8`;
const COLOR_YELLOW = `${COLOR_PREFIX}9`;
const COLOR_PURPLE = `${COLOR_PREFIX};`;

const itemNamesFilename = 'local\\lng\\strings\\item-names.json';
const itemNames = D2RMM.readJson(itemNamesFilename);
itemNames.forEach((item) => {
  const itemtype = item.Key;
  let newName = null;

  // health
  if (['hp1', 'hp2', 'hp3', 'hp4', 'hp5'].indexOf(itemtype) !== -1) {
    newName = `${COLOR_RED}${itemtype.toUpperCase()}`;
  }

  // mana
  if (['mp1', 'mp2', 'mp3', 'mp4', 'mp5'].indexOf(itemtype) !== -1) {
    newName = `${COLOR_BLUE}${itemtype.toUpperCase()}`;
  }

  // rejuvenation
  if (['rvl', 'rvs'].indexOf(itemtype) !== -1) {
    const suffix = itemtype.endsWith('l') ? '2' : '1';
    newName = `${COLOR_PURPLE}RP${suffix}`;
  }

  // strangling gas / choking gas / rancid
  if (['gpl', 'gpm', 'gps'].indexOf(itemtype) !== -1) {
    const suffix = itemtype.endsWith('l')
      ? '3'
      : itemtype.endsWith('m')
      ? '2'
      : '1';
    newName = `${COLOR_GREEN}GP${suffix}`;
  }

  // fulmigating / exploding / oil
  if (['opl', 'opm', 'ops'].indexOf(itemtype) !== -1) {
    const suffix = itemtype.endsWith('l')
      ? '3'
      : itemtype.endsWith('m')
      ? '2'
      : '1';
    newName = `${COLOR_ORANGE}EP${suffix}`;
  }

  // antidote
  if (itemtype === 'yps') {
    newName = `${COLOR_GRAY}AP`;
  }

  // thawing
  if (itemtype === 'wms') {
    newName = `${COLOR_YELLOW}TP`;
  }

  // stamina
  if (itemtype === 'vps') {
    newName = `${COLOR_GRAY}SP`;
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
