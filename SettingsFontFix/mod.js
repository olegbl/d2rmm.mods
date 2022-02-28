const profileHDFilename = 'global\\ui\\layouts\\_profilehd.json';
const profileHD = D2RMM.readJson(profileHDFilename);
profileHD.StyleSettingsNumericSlider = {
  ...profileHD.StyleSettingsNumeric,
  alignment: {
    ...profileHD.StyleSettingsNumeric.alignment,
    h: 'right',
  },
};
profileHD.SettingsSliderValueFields.style = '$StyleSettingsNumericSlider';
D2RMM.writeJson(profileHDFilename, profileHD);
