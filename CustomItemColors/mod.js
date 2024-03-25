class FileConstants {
  static EXTENSION_JSON = ".json";
  static PATH_GLOBAL_UI_LAYOUTS = `global\\ui\\layouts\\`;

  static FILE_PROFILE_HD            = `${this.PATH_GLOBAL_UI_LAYOUTS}_profilehd${this.EXTENSION_JSON}`;
  static FILE_PROFILE_LV            = `${this.PATH_GLOBAL_UI_LAYOUTS}_profilelv${this.EXTENSION_JSON}`;
  static FILE_CONTROLLER_PROFILE_LV = `${this.PATH_GLOBAL_UI_LAYOUTS}controller\\_profilelv${this.EXTENSION_JSON}`;
}

class Colors {
  static prefix = "$FontColor";
  
  static Beige         = `${this.prefix}Beige`;
  static Black         = `${this.prefix}Black`;
  static Blue          = `${this.prefix}Blue`;
  static CurrencyGold  = `${this.prefix}CurrencyGold`;
  static DarkGold      = `${this.prefix}DarkGold`;
  static DarkGrayBlue  = `${this.prefix}DarkGrayBlue`;
  static DarkGrayGold  = `${this.prefix}DarkGrayGold`;
  static DarkGreen     = `${this.prefix}DarkGreen`;
  static Gold          = `${this.prefix}Gold`;
  static GoldYellow    = `${this.prefix}GoldYellow`;
  static Gray          = `${this.prefix}Gray`;
  static Green         = `${this.prefix}Green`;
  static LightBlue     = `${this.prefix}LightBlue`;
  static LightGold     = `${this.prefix}LightGold`;
  static LightGray     = `${this.prefix}LightGray`;
  static LightPurple   = `${this.prefix}LightPurple`;
  static LightRed      = `${this.prefix}LightRed`;
  static LightTeal     = `${this.prefix}LightTeal`;
  static LightYellow   = `${this.prefix}LightYellow`;
  static Orange        = `${this.prefix}Orange`;
  static PartyGreen    = `${this.prefix}PartyGreen`;
  static PartyOrange   = `${this.prefix}PartyOrange`;
  static Red           = `${this.prefix}Red`;
  static Transparent   = `${this.prefix}Transparent`;
  static VeryLightGray = `${this.prefix}VeryLightGray`;
  static White         = `${this.prefix}White`;
  static Yellow        = `${this.prefix}Yellow`;
}

const color = "Color";
const VARIABLES = [
  `Default${color}`,
  `Ethereal${color}`,
  `Socketed${color}`,
  `Magic${color}`,
  `Rare${color}`,
  `Set${color}`,
  `Unique${color}`,
  `Crafted${color}`,
  `Tempered${color}`,
  `Quest${color}`,
  `Gold${color}`,
];

function setColorsForFile(path) {
  let file = D2RMM.readJson(path);
  setProfileColors(file);
  D2RMM.writeJson(path, file);
}

// todo: skip setting values if set to default, OR add a "disable" setting while clarifying that the default value will force-overwrite.
function setProfileColors(file) {
  VARIABLES.forEach((variable) => {
    let color = Colors[config[variable]];
    if (color != null) {
      file.TooltipStyle[variable] = color;
    }
  });
}

setColorsForFile(FILE_PROFILE_HD);
setColorsForFile(FILE_PROFILE_LV);
setColorsForFile(FILE_CONTROLLER_PROFILE_LV);
