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
];

function changeProfileColors(profile) {
  VARIABLES.forEach((variable) => {
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
