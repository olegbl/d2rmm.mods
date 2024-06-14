if (D2RMM.getVersion == null || D2RMM.getVersion() < 1.6) {
  D2RMM.error('Requires D2RMM version 1.6 or higher.');
  return;
}

const COLORS = {
  Beige: '$FontColorBeige',
  Black: '$FontColorBlack',
  Blue: '$FontColorBlue',
  CurrencyGold: '$FontColorCurrencyGold',
  DarkGold: '$FontColorDarkGold',
  DarkGrayBlue: '$FontColorDarkGrayBlue',
  DarkGrayGold: '$FontColorDarkGrayGold',
  DarkGreen: '$FontColorDarkGreen',
  Gold: '$FontColorGold',
  GoldYellow: '$FontColorGoldYellow',
  Gray: '$FontColorGray',
  Green: '$FontColorGreen',
  LightBlue: '$FontColorLightBlue',
  LightGold: '$FontColorLightGold',
  LightGray: '$FontColorLightGray',
  LightPurple: '$FontColorLightPurple',
  LightRed: '$FontColorLightRed',
  LightTeal: '$FontColorLightTeal',
  LightYellow: '$FontColorLightYellow',
  Orange: '$FontColorOrange',
  PartyGreen: '$FontColorPartyGreen',
  PartyOrange: '$FontColorPartyOrange',
  Red: '$FontColorRed',
  Transparent: '$FontColorTransparent',
  VeryLightGray: '$FontColorVeryLightGray',
  White: '$FontColorWhite',
  Yellow: '$FontColorYellow',
};

// https://imgur.com/a/lrqE6J1
const LOCALIZATION_COLORS = {
  White: 'ÿc0',
  Gray: 'ÿc5',
  Black: 'ÿc6',
  LightRed: 'ÿc1',
  BrightRed: 'ÿcU',
  Gold: 'ÿc4',
  Yellow: 'ÿc9',
  Orange: 'ÿc8',
  BrightGreen: 'ÿc2',
  DarkGreen: 'ÿcA',
  LightTeal: 'ÿcI',
  BrightTeal: 'ÿcK',
  LightCyan: 'ÿcT',
  BrightCyan: 'ÿcN',
  LightBlue: 'ÿcP',
  Blue: 'ÿc3',
  Purple: 'ÿc;',
  Pink: 'ÿcO',
};

const VARIABLES = [
  'DefaultColor',
  'EtherealColor',
  'SocketedColor',
  'MagicColor',
  'RareColor',
  'SetColor',
  'UniqueColor',
  'CraftedColor',
  'TemperedColor',
  'QuestColor',
  'GoldColor',
  'HealthPotionColor',
  'ManaPotionColor',
  'RejuvPotionColor',
  'EventItemsColor',
];

function changeProfileColors(profile) {
  VARIABLES.forEach((variable) => {
    if (config[variable] === 'Default') {
      return;
    }
    if (config[variable] === 'Custom') {
      profile.TooltipStyle[variable] = config['Custom' + variable];
      return;
    }
    const color = COLORS[config[variable]];
    if (color != null) {
      profile.TooltipStyle[variable] = color;
    }
  });
}

const profileHDFilename = 'global\\ui\\layouts\\_profilehd.json';
const profileHD = D2RMM.readJson(profileHDFilename);
changeProfileColors(profileHD);
D2RMM.writeJson(profileHDFilename, profileHD);

const profileLVFilename = 'global\\ui\\layouts\\_profilelv.json';
const profileLV = D2RMM.readJson(profileLVFilename);
changeProfileColors(profileLV);
D2RMM.writeJson(profileLVFilename, profileLV);

const controllerProfileLVFilename =
  'global\\ui\\layouts\\controller\\_profilelv.json';
const controllerProfileLV = D2RMM.readJson(controllerProfileLVFilename);
changeProfileColors(controllerProfileLV);
D2RMM.writeJson(controllerProfileLVFilename, controllerProfileLV);

const itemRunesFilename = 'local\\lng\\strings\\item-runes.json';
const itemRunes = D2RMM.readJson(itemRunesFilename);
itemRunes.forEach((item) => {
  const itemtype = item.Key;
  const match = itemtype.match(/^r([0-9]{2})$/);
  if (match != null) {
    const runeNumber = parseInt(match[1], 10);
    const category =
      runeNumber <= 11 ? 'Low' : runeNumber <= 22 ? 'Mid' : 'High';
    const colorName = config[category + 'RuneColor'];
    if (colorName === 'Default') {
      return;
    }
    const color = LOCALIZATION_COLORS[colorName];
    if (color === undefined) {
      // something went wrong
      console.warn(
        `Unknown color ${colorName} for ${category} rune #${runeNumber} (${itemtype})`
      );
      return;
    }
    // update all localizations
    for (const key in item) {
      if (key !== 'id' && key !== 'Key') {
        // color codes must appear after gender codes
        const [, prefix = '', value] = item[key].match(/^(\[fs\])?(.*)$/);
        item[key] = `${prefix}${color}${value}`;
      }
    }
  }
});
D2RMM.writeJson(itemRunesFilename, itemRunes);
