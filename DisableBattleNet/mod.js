const DISABLED_TOOLTIP = 'Not available in modded game.';
const mainMenuPanelHDFilename = 'global\\ui\\layouts\\mainmenupanelhd.json';
const mainMenuPanelHD = D2RMM.readJson(mainMenuPanelHDFilename);
const QuickPlayButton = mainMenuPanelHD.children.find(
  (child) => child.name === 'QuickPlayButton'
);
mainMenuPanelHD.children = mainMenuPanelHD.children
  .map((child) => {
    // we will repurpose the divider to render a disabled Play button instead
    // since the divider conveniently only shows up for the online version of the menu
    if (child.name === 'Divider') {
      // delete the default element
      return null;
    }

    // "play" button
    if (child.name === 'QuickPlayButton') {
      // don't do anything to the play button
      // because we still need it to work for single player
    }

    // "lobby" button
    if (child.name === 'SecondaryContextButton') {
      // disable the button
      child.fields.tooltipString = DISABLED_TOOLTIP;
      child.fields.textColor = { r: 160, g: 160, b: 160, a: 255 };
      child.fields.normalFrame = 2;
      child.fields.hoveredFrame = 2;
      child.fields.pressedFrame = 2;
      child.fields.disabledFrame = 2;
      child.fields.onClickMessage = ''; // this doesn't work for some reason
    }

    // "online settings" button
    if (child.name === 'OnlinePlaySettingsButton') {
      // disable the button
      child.fields.tooltipString = DISABLED_TOOLTIP;
      child.fields.normalFrame = 3;
      child.fields.hoveredFrame = 3;
      child.fields.pressedFrame = 3;
      child.fields.disabledFrame = 3;
      child.fields.onClickMessage = '';
    }

    return child;
  })
  .concat([
    {
      ...QuickPlayButton,
      name: 'Divider',
      fields: {
        ...QuickPlayButton.fields,
        rect: {
          ...QuickPlayButton.fields.rect,
          x: -625,
        },
        textString: 'Play',
        tooltipString: DISABLED_TOOLTIP,
        textColor: { r: 160, g: 160, b: 160, a: 255 },
        normalFrame: 2,
        hoveredFrame: 2,
        pressedFrame: 2,
        disabledFrame: 2,
        onClickMessage: '',
      },
    },
  ])
  .filter((child) => child != null);
D2RMM.writeJson(mainMenuPanelHDFilename, mainMenuPanelHD);

// Character selection panel is in characterselectpanelhd.json
// but can't disable anything in there without affecting singleplayer
// and the tab control's enabled/disabled state is controlled by code
// not by ui config
