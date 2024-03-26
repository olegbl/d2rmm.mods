class FileConstants {
  static EXTENSION_JSON = ".json";
  static PATH_GLOBAL_UI_LAYOUTS = `global\\ui\\layouts\\`;

  static FILE_PROFILE_HD            = `${this.PATH_GLOBAL_UI_LAYOUTS}_profilehd${this.EXTENSION_JSON}`;
  static FILE_PROFILE_LV            = `${this.PATH_GLOBAL_UI_LAYOUTS}_profilelv${this.EXTENSION_JSON}`;
  static FILE_CONTROLLER_PROFILE_LV = `${this.PATH_GLOBAL_UI_LAYOUTS}controller\\_profilelv${this.EXTENSION_JSON}`;
}

class ColorConstants {
  static fontColorPrefix = "$FontColor";
  static colorSuffix = "Color";
  static fontColors = [
    `Default${this.colorSuffix}`,
    `Ethereal${this.colorSuffix}`,
    `Socketed${this.colorSuffix}`,
    `Magic${this.colorSuffix}`,
    `Rare${this.colorSuffix}`,
    `Set${this.colorSuffix}`,
    `Unique${this.colorSuffix}`,
    `Crafted${this.colorSuffix}`,
    `Tempered${this.colorSuffix}`,
    `Quest${this.colorSuffix}`,
    `Gold${this.colorSuffix}`,
    `HealthPotion${this.colorSuffix}`,
    `ManaPotion${this.colorSuffix}`,
    `RejuvPotion${this.colorSuffix}`,
    `Rune${this.colorSuffix}`,
    `EventItems${this.colorSuffix}`,
  ];
}

class CustomItemColorsMod {
  apply() {
    this.setColorsForFile(FileConstants.FILE_PROFILE_HD);
    this.setColorsForFile(FileConstants.FILE_PROFILE_LV);
    this.setColorsForFile(FileConstants.FILE_CONTROLLER_PROFILE_LV);
  }

  setColorsForFile(path) {
    let file = D2RMM.readJson(path);
    this.setProfileColors(file);
    D2RMM.writeJson(path, file);
  }
  
  setProfileColors(file) {
    ColorConstants.fontColors.forEach(fontColor => {
      let newColor = config[fontColor];
      if (newColor == null || newColor === "disable") {
        return;
      }
      file.TooltipStyle[fontColor] = `${ColorConstants.fontColorPrefix}${newColor}`;
    });
  }
}

(new CustomItemColorsMod()).apply();
