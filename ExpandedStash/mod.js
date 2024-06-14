if (D2RMM.getVersion == null || D2RMM.getVersion() < 1.6) {
  D2RMM.error('Requires D2RMM version 1.6 or higher.');
  return;
}

const tabNamePersonal = (!config.IsCustomTabNamesEnabled || config.tabNamePersonal === "") ? "@personal" : config.tabNamePersonal;
const tabNameShared1  = (!config.IsCustomTabNamesEnabled || config.tabNameShared1  === "") ? "@shared"   : config.tabNameShared1;
const tabNameShared2  = (!config.IsCustomTabNamesEnabled || config.tabNameShared2  === "") ? "@shared"   : config.tabNameShared2;
const tabNameShared3  = (!config.IsCustomTabNamesEnabled || config.tabNameShared3  === "") ? "@shared"   : config.tabNameShared3;
const tabNameShared4  = (!config.IsCustomTabNamesEnabled || config.tabNameShared4  === "") ? "@shared"   : config.tabNameShared4;
const tabNameShared5  = (!config.IsCustomTabNamesEnabled || config.tabNameShared5  === "") ? "@shared"   : config.tabNameShared5;
const tabNameShared6  = (!config.IsCustomTabNamesEnabled || config.tabNameShared6  === "") ? "@shared"   : config.tabNameShared6;
const tabNameShared7  = (!config.IsCustomTabNamesEnabled || config.tabNameShared7  === "") ? "@shared"   : config.tabNameShared7;

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
bankExpansionLayout.children = bankExpansionLayout.children.map((child) => {
  if (
    child.name === 'PreviousSeasonToggleDisplay' ||
    child.name === 'PreviousLadderSeasonBankTabs'
  ) {
    return false;
  }
  if (child.name === 'grid') {
    child.fields.cellCount.x = 16;
    child.fields.cellCount.y = 13;
  }
  if (child.name === 'BankTabs') {
    child.fields.tabCount = 8;
    child.fields.textStrings = [
      tabNamePersonal,
      tabNameShared1,
      tabNameShared2,
      tabNameShared3,
      tabNameShared4,
      tabNameShared5,
      tabNameShared6,
      tabNameShared7,
    ];
  }
  return true;
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
    if (
      child.name === 'PreviousSeasonToggleDisplay' ||
      child.name === 'PreviousLadderSeasonBankTabs'
    ) {
      return false;
    }
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
        tabNamePersonal,
        tabNameShared1,
        tabNameShared2,
        tabNameShared3,
        tabNameShared4,
        tabNameShared5,
        tabNameShared6,
        tabNameShared7,
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
bankExpansionControllerLayoutHD.children =
  bankExpansionControllerLayoutHD.children.filter((child) => {
    if (
      child.name === 'PreviousSeasonToggleDisplay' ||
      child.name === 'PreviousLadderSeasonBankTabs'
    ) {
      return false;
    }
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
        tabNamePersonal,
        tabNameShared1,
        tabNameShared2,
        tabNameShared3,
        tabNameShared4,
        tabNameShared5,
        tabNameShared6,
        tabNameShared7,
      ];
      child.fields.tabLeftIndicatorPosition = { x: -42, y: -2 };
      child.fields.tabRightIndicatorPosition = { x: 1135 + 300, y: -2 };
    }
    return true;
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

// modify the stash save file to make sure it has 8 tab pages
// prettier-ignore
const STASH_TAB = Buffer.from([
  // extracted from first 68 bytes of an empty stash save file (SharedStashSoftCoreV2.d2i) of D2R v1.6.80273
  0x55, 0xAA, 0x55, 0xAA, 0x01, 0x00, 0x00, 0x00, 0x63, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // 16 bytes
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // 16 bytes
  0x44, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // 16 bytes
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // 16 bytes
  0x4A, 0x4D, 0x00, 0x00                                                                          //  4 bytes
]);
const stashData = D2RMM.readSaveFile('SharedStashSoftCoreV2.d2i');
if (stashData == null) {
  console.error(
    'Unable to enable additional shared stash tabs in the save file: SharedStashSoftCoreV2.d2i was not found.'
  );
} else {
  // backup existing stash tab data if it doesn't exist
  const stashDataBackup = D2RMM.readSaveFile('SharedStashSoftCoreV2.d2i.bak');
  if (stashDataBackup == null) {
    D2RMM.writeSaveFile('SharedStashSoftCoreV2.d2i.bak', stashData);
  }
  // find number of times prefix appears in stashData
  const stashTabPrefix = STASH_TAB.slice(0, 10);
  let existingTabsCount = -1;
  let index = -1;
  do {
    existingTabsCount++;
    index = stashData.indexOf(stashTabPrefix, index + 1);
  } while (index !== -1);
  // sanitize the data (each save files should have 3-7 shared tabs)
  existingTabsCount = Math.max(3, Math.min(7, existingTabsCount));
  const tabsToAdd = 7 - existingTabsCount;
  // don't modify the save file if it doesn't need it
  if (tabsToAdd > 0) {
    D2RMM.writeSaveFile(
      'SharedStashSoftCoreV2.d2i',
      Buffer.concat([stashData, ...new Array(tabsToAdd).fill(STASH_TAB)])
    );
  }
}
