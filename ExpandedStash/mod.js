const inventoryFilename = 'global\\excel\\inventory.txt';
const inventory = D2RMM.readTsv(inventoryFilename);
inventory.rows.forEach((row) => {
  const id = row.class;
  if (
    id === 'Bank Page 1' ||
    id === 'Big Bank Page 1' ||
    id === 'Bank Page2' ||
    id === 'Big Bank Page2'
  ) {
    row.gridX = 16;
    row.gridY = 13;
  }
});
D2RMM.writeTsv(inventoryFilename, inventory);

const profileHDFilename = 'global\\ui\\layouts\\_profilehd.json';
const profileHD = D2RMM.readJson(profileHDFilename);
profileHD.LeftPanelRect_ExpandedStash = {
  x: 236,
  y: -651,
  width: 1687,
  height: 1507,
};
profileHD.PanelClickCatcherRect_ExpandedStash = {
  x: 0,
  y: 0,
  width: 1687,
  height: 1507,
};
// offset the left hinge so that it doesn't overlap with content of the left panel
profileHD.LeftHingeRect = { x: -236 - 25, y: 630 };
D2RMM.writeJson(profileHDFilename, profileHD);

const profileLVFilename = 'global\\ui\\layouts\\_profilelv.json';
const profileLV = D2RMM.readJson(profileLVFilename);
profileLV.LeftPanelRect_ExpandedStash = {
  x: 0,
  y: -856,
  width: 1687,
  height: 1507,
  scale: 1.16,
};
D2RMM.writeJson(profileLVFilename, profileLV);

const bankOriginalLayoutFilename =
  'global\\ui\\layouts\\bankoriginallayout.json';
const bankOriginalLayout = D2RMM.readJson(bankOriginalLayoutFilename);
// TODO: new sprite & layout for classic UI
bankOriginalLayout.children.forEach((child) => {
  if (child.name === 'grid') {
    child.fields.cellCount.x = 16;
    child.fields.cellCount.y = 13;
  }
});
D2RMM.writeJson(bankOriginalLayoutFilename, bankOriginalLayout);

const bankExpansionLayoutFilename =
  'global\\ui\\layouts\\bankexpansionlayout.json';
const bankExpansionLayout = D2RMM.readJson(bankExpansionLayoutFilename);
// TODO: new sprite & layout for classic UI
bankExpansionLayout.children.forEach((child) => {
  if (child.name === 'grid') {
    child.fields.cellCount.x = 16;
    child.fields.cellCount.y = 13;
  }
  if (child.name === 'BankTabs') {
    child.fields.tabCount = 8;
    child.fields.textStrings = [
      '@personal',
      '@shared',
      '@shared',
      '@shared',
      '@shared',
      '@shared',
      '@shared',
      '@shared',
    ];
  }
});
D2RMM.writeJson(bankExpansionLayoutFilename, bankExpansionLayout);

const bankOriginalLayoutHDFilename =
  'global\\ui\\layouts\\bankoriginallayouthd.json';
const bankOriginalLayoutHD = D2RMM.readJson(bankOriginalLayoutHDFilename);
bankOriginalLayoutHD.fields.rect = '$LeftPanelRect_ExpandedStash';
bankOriginalLayoutHD.children.forEach((child) => {
  if (child.name === 'grid') {
    child.fields.cellCount.x = 16;
    child.fields.cellCount.y = 13;
    child.fields.rect.x = child.fields.rect.x - 229;
    child.fields.rect.y = child.fields.rect.y - 572;
  }
  if (child.name === 'click_catcher') {
    child.fields.rect = '$PanelClickCatcherRect_ExpandedStash';
  }
  if (child.name === 'background') {
    child.fields.filename = 'PANEL\\Stash\\StashPanel_BG_Expanded';
    child.fields.rect = { x: 0, y: 0 };
  }
  if (child.name === 'gold_amount') {
    child.fields.rect.x = 60 + 60 + 16;
    child.fields.rect.y = 61 + 16;
  }
  if (child.name === 'gold_withdraw') {
    child.fields.rect.x = 60 + 16;
    child.fields.rect.y = 58 + 16;
  }
  if (child.name === 'title') {
    child.fields.rect = {
      x: 91 + (1687 - 1162) / 2,
      y: 64,
      width: 972,
      height: 71,
    };
  }
  if (child.name === 'close') {
    child.fields.rect.x = child.fields.rect.x + (1687 - 1162);
  }
});
D2RMM.writeJson(bankOriginalLayoutHDFilename, bankOriginalLayoutHD);

const bankExpansionLayoutHDFilename =
  'global\\ui\\layouts\\bankexpansionlayouthd.json';
const bankExpansionLayoutHD = D2RMM.readJson(bankExpansionLayoutHDFilename);
bankExpansionLayoutHD.children = bankExpansionLayoutHD.children.filter(
  (child) => {
    if (child.name === 'grid') {
      child.fields.cellCount.x = 16;
      child.fields.cellCount.y = 13;
      child.fields.rect.x = child.fields.rect.x - 37;
      child.fields.rect.y = child.fields.rect.y - 58;
    }
    if (child.name === 'background') {
      child.fields.filename = 'PANEL\\Stash\\StashPanel_BG_Expanded';
    }
    if (child.name === 'BankTabs') {
      child.fields.filename = 'PANEL\\stash\\Stash_Tabs_Expanded';
      child.fields.rect.x = child.fields.rect.x - 30;
      child.fields.rect.y = child.fields.rect.y - 56;
      child.fields.tabCount = 8;
      // 249 x 80 -> 197 x 80 (bottom 5 pixels are overlay)
      child.fields.tabSize = { x: 197, y: 75 };
      child.fields.tabPadding = { x: 0, y: 0 };
      child.fields.inactiveFrames = [0, 0, 0, 0, 0, 0, 0, 0];
      child.fields.activeFrames = [1, 1, 1, 1, 1, 1, 1, 1];
      child.fields.disabledFrames = [0, 0, 0, 0, 0, 0, 0, 0];
      child.fields.textStrings = [
        '@personal',
        '@shared',
        '@shared',
        '@shared',
        '@shared',
        '@shared',
        '@shared',
        '@shared',
      ];
    }
    if (child.name === 'gold_amount') {
      child.fields.rect.x = 60 + 60;
      child.fields.rect.y = 61;
    }
    if (child.name === 'gold_withdraw') {
      child.fields.rect.x = 60;
      child.fields.rect.y = 58;
    }
    if (child.name === 'title') {
      // hide title
      return false;
    }
    return true;
  }
);
D2RMM.writeJson(bankExpansionLayoutHDFilename, bankExpansionLayoutHD);

const controllerOverlayHDFilename =
  'global\\ui\\layouts\\controller\\controlleroverlayhd.json';
const controllerOverlayHD = D2RMM.readJson(controllerOverlayHDFilename);
controllerOverlayHD.children.forEach((child) => {
  if (child.name === 'Anchor') {
    child.children.forEach((subchild) => {
      if (subchild.name === 'ControllerCursorBounds') {
        delete subchild.fields.fitToParent;
        subchild.fields.rect = {
          x: -285,
          y: 0,
          width: 2880 + 285,
          height: 1763,
        };
      }
    });
  }
});
D2RMM.writeJson(controllerOverlayHDFilename, controllerOverlayHD);

const bankOriginalControllerLayoutHDFilename =
  'global\\ui\\layouts\\controller\\bankoriginallayouthd.json';
const bankOriginalControllerLayoutHD = D2RMM.readJson(
  bankOriginalControllerLayoutHDFilename
);
bankOriginalControllerLayoutHD.children.forEach((child) => {
  if (child.name === 'background') {
    child.fields.filename =
      'Controller/Panel/Stash/V2/Classic_StashPanelBG_Expanded';
    child.fields.rect.x = child.fields.rect.x - 285 - 81 - 2 - 120;
    child.fields.rect.y = child.fields.rect.y + 17 - 293 + 100;
  }
  if (child.name === 'gold_amount' || child.name === 'gold_withdraw') {
    child.fields.rect.x = child.fields.rect.x - 476 - 280;
    child.fields.rect.y = child.fields.rect.y - 1404 + 30;
  }
  if (child.name === 'gold_max') {
    child.fields.rect.x = child.fields.rect.x - 476 + 927;
    child.fields.rect.y = child.fields.rect.y - 1404 - 90 + 25;
  }
  if (child.name === 'grid') {
    child.fields.rect.x = -285 + 9;
    child.fields.rect.y = 119;
  }
});
D2RMM.writeJson(
  bankOriginalControllerLayoutHDFilename,
  bankOriginalControllerLayoutHD
);

const bankExpansionControllerLayoutHDFilename =
  'global\\ui\\layouts\\controller\\bankexpansionlayouthd.json';
const bankExpansionControllerLayoutHD = D2RMM.readJson(
  bankExpansionControllerLayoutHDFilename
);
bankExpansionControllerLayoutHD.children.forEach((child) => {
  if (child.name === 'background') {
    child.fields.filename = 'Controller/Panel/Stash/V2/StashPanelBG_Expanded';
    child.fields.rect.x = child.fields.rect.x - 285 - 81;
    child.fields.rect.y = child.fields.rect.y + 17 - 293;
  }
  if (child.name === 'gold_amount' || child.name === 'gold_withdraw') {
    child.fields.rect.x = child.fields.rect.x - 476 - 280;
    child.fields.rect.y = child.fields.rect.y - 1404;
  }
  if (child.name === 'gold_max') {
    child.fields.rect.x = child.fields.rect.x - 476 + 927;
    child.fields.rect.y = child.fields.rect.y - 1404 - 90;
  }
  if (child.name === 'grid') {
    child.fields.cellCount.x = 16;
    child.fields.cellCount.y = 13;
    child.fields.rect.x = -285 + 9;
    child.fields.rect.y = 119;
  }
  if (child.name === 'BankTabs') {
    child.fields.filename = 'Controller/Panel/Stash/V2/StashTabs_Expanded';
    child.fields.focusIndicatorFilename =
      'Controller/HoverImages/StashTab_Hover_Expanded';
    child.fields.rect.x = child.fields.rect.x - 300;
    child.fields.rect.y = child.fields.rect.y + 10;
    child.fields.tabCount = 8;
    child.fields.tabSize = { x: 175, y: 120 };
    child.fields.tabPadding = { x: 0, y: 0 };
    child.fields.inactiveFrames = [1, 1, 1, 1, 1, 1, 1, 1];
    child.fields.activeFrames = [0, 0, 0, 0, 0, 0, 0, 0];
    child.fields.disabledFrames = [1, 1, 1, 1, 1, 1, 1, 1];
    child.fields.textStrings = [
      '@personal',
      '@shared',
      '@shared',
      '@shared',
      '@shared',
      '@shared',
      '@shared',
      '@shared',
    ];
    child.fields.tabLeftIndicatorPosition = { x: -42, y: -2 };
    child.fields.tabRightIndicatorPosition = { x: 1135 + 300, y: -2 };
  }
});
D2RMM.writeJson(
  bankExpansionControllerLayoutHDFilename,
  bankExpansionControllerLayoutHD
);

D2RMM.copyFile(
  'hd', // <mod folder>\hd
  'hd', // <diablo 2 folder>\mods\<modname>\<modname>.mpq\data\hd
  true // overwrite any conflicts
);
