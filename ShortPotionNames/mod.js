const COLOR_PREFIX = 'ÿc';
const COLOR_ANTIDOTE = `${COLOR_PREFIX}5`;
const COLOR_GAS = `${COLOR_PREFIX}:`;
const COLOR_HEALTH = `${COLOR_PREFIX}1`;
const COLOR_MANA = `${COLOR_PREFIX}3`;
const COLOR_OIL = `${COLOR_PREFIX}S`;
const COLOR_REJUVENATION = `${COLOR_PREFIX};`;
const COLOR_STAMINA = `${COLOR_PREFIX}5`;
const COLOR_THAWING = `${COLOR_PREFIX}5`;

// ÿc0 - white
// ÿc1 - red
// ÿc2 - green
// ÿc3 - blue
// ÿc4 - gold
// ÿc5 - gray
// ÿc6 - black
// ÿc7 - tan
// ÿc8 - orange
// ÿc9 - yellow
// ÿc; - purple
// ÿc= - white1
// ÿcK - gray1
// ÿcI - gray2
// ÿcM - black1
// ÿcE - lightred
// ÿcU - red1
// ÿcS - darkred
// ÿc@ - orange1
// ÿcJ - orange2
// ÿcL - orange3
// ÿcH - lightgold1
// ÿcD - gold1
// ÿcR - yellow1
// ÿcQ - green1
// ÿcC - green2
// ÿc< - green3
// ÿcA - darkgreen1
// ÿc: - darkgreen2
// ÿcN - turquoise
// ÿcT - skyblue
// ÿcF - lightblue1
// ÿcP - lightblue2
// ÿcB - blue1
// ÿcG - lightpink
// ÿcO - pink

const itemNamesFilename = 'local\\lng\\strings\\item-names.json';
const itemNames = D2RMM.readJson(itemNamesFilename);
itemNames.forEach((item) => {
  const itemtype = item.Key;
  let newName = null;

  // health
  if (['hp1', 'hp2', 'hp3', 'hp4', 'hp5'].indexOf(itemtype) !== -1) {
    newName = `${COLOR_HEALTH}${itemtype.toUpperCase()}`;
  }

  // mana
  if (['mp1', 'mp2', 'mp3', 'mp4', 'mp5'].indexOf(itemtype) !== -1) {
    newName = `${COLOR_MANA}${itemtype.toUpperCase()}`;
  }

  // rejuvenation
  if (['rvl', 'rvs'].indexOf(itemtype) !== -1) {
    const suffix = itemtype.endsWith('l') ? '2' : '1';
    newName = `${COLOR_REJUVENATION}JP${suffix}`;
  }

  // strangling gas / choking gas / rancid
  if (['gpl', 'gpm', 'gps'].indexOf(itemtype) !== -1) {
    // these are backwards for some reason... "l" is the weakest one, "s" is the strongest one
    const suffix = itemtype.endsWith('l')
      ? '1'
      : itemtype.endsWith('m')
      ? '2'
      : '3';
    newName = `${COLOR_GAS}Gas ${suffix}`;
  }

  // fulmigating / exploding / oil
  if (['opl', 'opm', 'ops'].indexOf(itemtype) !== -1) {
    // these are backwards for some reason... "l" is the weakest one, "s" is the strongest one
    const suffix = itemtype.endsWith('l')
      ? '1'
      : itemtype.endsWith('m')
      ? '2'
      : '3';
    newName = `${COLOR_OIL}Oil ${suffix}`;
  }

  // antidote
  if (itemtype === 'yps') {
    newName = `${COLOR_ANTIDOTE}Anti`;
  }

  // thawing
  if (itemtype === 'wms') {
    newName = `${COLOR_THAWING}Thaw`;
  }

  // stamina
  if (itemtype === 'vps') {
    newName = `${COLOR_STAMINA}Stam`;
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
