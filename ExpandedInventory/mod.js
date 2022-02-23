const inventoryFilename = 'global\\excel\\inventory.txt';
const inventory = D2RMM.readTsv(inventoryFilename);
inventory.rows.forEach((row) => {
  const id = row.class;
  const classes = [
    'Amazon',
    'Assassin',
    'Barbarian',
    'Druid',
    'Necromancer',
    'Paladin',
    'Sorceress',
  ];
  if (
    classes.indexOf(id) !== -1 ||
    classes.map((cls) => `${cls}2`).indexOf(id) !== -1
  ) {
    row.gridX = 13;
    row.gridY = 8;
  }
});
D2RMM.writeTsv(inventoryFilename, inventory);

const profileHDFilename = 'global\\ui\\layouts\\_profilehd.json';
const profileHD = D2RMM.readJson(profileHDFilename);
profileHD.RightPanelRect_ExpandedInventory = {
  x: -1394 - (1382 - 1162),
  y: -651,
  width: 1382,
  height: 1507,
};
profileHD.PanelClickCatcherRect_ExpandedInventory = {
  x: 0,
  y: 0,
  width: 1162,
  height: 1507,
};
// offset the right hinge so that it doesn't overlap with content of the right panel
profileHD.RightHingeRect = { x: 1076 + 20, y: 630 };
profileHD.RightHingeRect_ExpandedInventory = {
  x: 1076 + (1382 - 1162) + 20,
  y: 630,
};
D2RMM.writeJson(profileHDFilename, profileHD);

const profileLVFilename = 'global\\ui\\layouts\\_profilelv.json';
const profileLV = D2RMM.readJson(profileLVFilename);
profileLV.RightPanelRect_ExpandedInventory = {
  x: -1346 - (1382 - 1162) * 1.16,
  y: -856,
  width: 1382,
  height: 1507,
  scale: 1.16,
};
D2RMM.writeJson(profileLVFilename, profileLV);

const playerInventoryOriginalLayoutFilename =
  'global\\ui\\layouts\\playerinventoryoriginallayout.json';
const playerInventoryOriginalLayout = D2RMM.readJson(
  playerInventoryOriginalLayoutFilename
);
// TODO: new sprite & layout for classic UI
playerInventoryOriginalLayout.children.forEach((child) => {
  if (child.name === 'grid') {
    child.fields.cellCount.x = 13;
    child.fields.cellCount.y = 8;
  }
});
D2RMM.writeJson(
  playerInventoryOriginalLayoutFilename,
  playerInventoryOriginalLayout
);

const playerInventoryOriginalLayoutHDFilename =
  'global\\ui\\layouts\\playerinventoryoriginallayouthd.json';
const playerInventoryOriginalLayoutHD = D2RMM.readJson(
  playerInventoryOriginalLayoutHDFilename
);
playerInventoryOriginalLayoutHD.fields.rect =
  '$RightPanelRect_ExpandedInventory';
playerInventoryOriginalLayoutHD.children =
  playerInventoryOriginalLayoutHD.children.filter((child) => {
    if (child.name === 'background') {
      child.fields.filename = 'PANEL\\Inventory\\Classic_Background_Expanded';
    }
    if (child.name === 'click_catcher') {
      child.fields.rect = { x: 0, y: 45, width: 1093, height: 1495 };
    }
    if (child.name === 'RightHinge') {
      child.fields.rect = '$RightHingeRect_ExpandedInventory';
    }
    if (child.name === 'title') {
      child.fields.rect = {
        x: 91 + (1382 - 1162) / 2,
        y: 64,
        width: 972,
        height: 71,
      };
    }
    if (child.name === 'close') {
      child.fields.rect.x = child.fields.rect.x + (1382 - 1162);
    }
    if (child.name === 'grid') {
      child.fields.cellCount.x = 13;
      child.fields.cellCount.y = 8;
      child.fields.rect.x = child.fields.rect.x - 37;
      child.fields.rect.y = child.fields.rect.y - 229;
    }
    if (child.name === 'slot_right_arm') {
      child.fields.rect.x = child.fields.rect.x - 14;
      child.fields.rect.y = child.fields.rect.y + 12;
    }
    if (child.name === 'slot_left_arm') {
      child.fields.rect.x = child.fields.rect.x + 227;
      child.fields.rect.y = child.fields.rect.y + 12;
    }
    if (child.name === 'slot_torso') {
      child.fields.rect.x = child.fields.rect.x + 101;
      child.fields.rect.y = child.fields.rect.y - 229;
    }
    if (child.name === 'slot_head') {
      child.fields.rect.x = child.fields.rect.x - 144;
      child.fields.rect.y = child.fields.rect.y + 12;
    }
    if (child.name === 'slot_gloves') {
      child.fields.rect.x = child.fields.rect.x + 231;
      child.fields.rect.y = child.fields.rect.y - 233;
    }
    if (child.name === 'slot_feet') {
      child.fields.rect.x = child.fields.rect.x - 26;
      child.fields.rect.y = child.fields.rect.y - 231;
    }
    if (child.name === 'slot_belt') {
      child.fields.rect.x = child.fields.rect.x + 101;
      child.fields.rect.y = child.fields.rect.y - 234;
    }
    if (child.name === 'slot_neck') {
      child.fields.rect.x = child.fields.rect.x + 99;
      child.fields.rect.y = child.fields.rect.y - 182;
    }
    if (child.name === 'slot_right_hand') {
      child.fields.rect.x = child.fields.rect.x + 474;
      child.fields.rect.y = child.fields.rect.y - 466;
    }
    if (child.name === 'slot_left_hand') {
      child.fields.rect.x = child.fields.rect.x + 232;
      child.fields.rect.y = child.fields.rect.y - 466;
    }
    if (child.name === 'gold_amount' || child.name === 'gold_button') {
      child.fields.rect.x = child.fields.rect.x - 291;
      child.fields.rect.y = child.fields.rect.y - 1267;
    }
    return true;
  });
D2RMM.writeJson(
  playerInventoryOriginalLayoutHDFilename,
  playerInventoryOriginalLayoutHD
);

const playerInventoryExpansionLayoutHDFilename =
  'global\\ui\\layouts\\playerinventoryexpansionlayouthd.json';
const playerInventoryExpansionLayoutHD = D2RMM.readJson(
  playerInventoryExpansionLayoutHDFilename
);
playerInventoryExpansionLayoutHD.children =
  playerInventoryExpansionLayoutHD.children.filter((child) => {
    if (child.name === 'click_catcher') {
      // make click catcher work the same way as in the originallayouthd file
      return false;
    }
    if (child.name === 'background') {
      child.fields.filename = 'PANEL\\Inventory\\Background_Expanded';
    }
    if (
      child.name === 'background_right_arm' ||
      child.name === 'background_right_arm_selected' ||
      child.name === 'weaponswap_right_arm' ||
      child.name === 'text_i_left' ||
      child.name === 'text_ii_left'
    ) {
      child.fields.rect.x = child.fields.rect.x - 14;
      child.fields.rect.y = child.fields.rect.y + 12;
    }
    if (
      child.name === 'background_left_arm' ||
      child.name === 'background_left_arm_selected' ||
      child.name === 'weaponswap_left_arm' ||
      child.name === 'text_i_right' ||
      child.name === 'text_ii_right'
    ) {
      child.fields.rect.x = child.fields.rect.x + 227;
      child.fields.rect.y = child.fields.rect.y + 12;
    }
    return true;
  });
D2RMM.writeJson(
  playerInventoryExpansionLayoutHDFilename,
  playerInventoryExpansionLayoutHD
);

const playerInventoryOriginalControllerLayoutHDFilename =
  'global\\ui\\layouts\\controller\\playerinventoryoriginallayouthd.json';
const playerInventoryOriginalControllerLayoutHD = D2RMM.readJson(
  playerInventoryOriginalControllerLayoutHDFilename
);
playerInventoryOriginalControllerLayoutHD.children.forEach((child) => {
  if (child.name === 'background') {
    child.fields.filename =
      'Controller/Panel/InventoryPanel/V2/InventoryBG_Classic_Expanded';
    child.fields.rect.x = child.fields.rect.x - 166;
    child.fields.rect.y = child.fields.rect.y - 160;
  }
  if (child.name === 'grid') {
    child.fields.rect.x = child.fields.rect.x - 132;
    child.fields.rect.y = child.fields.rect.y - 344;
  }
  if (child.name === 'slot_right_arm') {
    child.fields.rect.x = child.fields.rect.x - 99;
    child.fields.rect.y = child.fields.rect.y - 60;
  }
  if (child.name === 'slot_left_arm') {
    child.fields.rect.x = child.fields.rect.x + 123;
    child.fields.rect.y = child.fields.rect.y - 62;
  }
  if (child.name === 'slot_torso') {
    child.fields.rect.x = child.fields.rect.x + 6;
    child.fields.rect.y = child.fields.rect.y - 199;
  }
  if (child.name === 'slot_head') {
    child.fields.rect.x = child.fields.rect.x - 239;
    child.fields.rect.y = child.fields.rect.y + 21;
  }
  if (child.name === 'slot_gloves') {
    child.fields.rect.x = child.fields.rect.x + 146;
    child.fields.rect.y = child.fields.rect.y - 282;
  }
  if (child.name === 'slot_feet') {
    child.fields.rect.x = child.fields.rect.x - 130;
    child.fields.rect.y = child.fields.rect.y - 281;
  }
  if (child.name === 'slot_belt') {
    child.fields.rect.x = child.fields.rect.x + 7;
    child.fields.rect.y = child.fields.rect.y - 185;
  }
  if (child.name === 'slot_neck') {
    child.fields.rect.x = child.fields.rect.x - 3;
    child.fields.rect.y = child.fields.rect.y - 167;
  }
  if (child.name === 'slot_right_hand') {
    child.fields.rect.x = child.fields.rect.x + 389;
    child.fields.rect.y = child.fields.rect.y - 417;
  }
  if (child.name === 'slot_left_hand') {
    child.fields.rect.x = child.fields.rect.x + 126;
    child.fields.rect.y = child.fields.rect.y - 417;
  }
  if (child.name === 'Belt') {
    child.fields.rect.x = child.fields.rect.x + 15;
    child.fields.rect.y = child.fields.rect.y + 595;
  }
  if (child.name === 'gold_amount' || child.name === 'gold_button') {
    child.fields.rect.x = child.fields.rect.x - 474;
    child.fields.rect.y = child.fields.rect.y - 1454;
  }
});
D2RMM.writeJson(
  playerInventoryOriginalControllerLayoutHDFilename,
  playerInventoryOriginalControllerLayoutHD
);

const playerInventoryExpansionControllerLayoutHDFilename =
  'global\\ui\\layouts\\controller\\playerinventoryexpansionlayouthd.json';
const playerInventoryExpansionControllerLayoutHD = D2RMM.readJson(
  playerInventoryExpansionControllerLayoutHDFilename
);
playerInventoryExpansionControllerLayoutHD.children.forEach((child) => {
  if (child.name === 'background') {
    child.fields.filename =
      'Controller/Panel/InventoryPanel/V2/InventoryBG_Expanded';
  }
  if (
    child.name === 'background_right_arm' ||
    child.name === 'background_right_arm_selected' ||
    child.name === 'WeaponSwapRightLegend' ||
    child.name === 'text_i_left' ||
    child.name === 'text_ii_left'
  ) {
    child.fields.rect.x = child.fields.rect.x - 99;
    child.fields.rect.y = child.fields.rect.y - 60;
  }
  if (
    child.name === 'background_left_arm' ||
    child.name === 'background_left_arm_selected' ||
    child.name === 'WeaponSwapLeftLegend' ||
    child.name === 'text_i_right' ||
    child.name === 'text_ii_right'
  ) {
    child.fields.rect.x = child.fields.rect.x + 123;
    child.fields.rect.y = child.fields.rect.y - 62;
  }
});
D2RMM.writeJson(
  playerInventoryExpansionControllerLayoutHDFilename,
  playerInventoryExpansionControllerLayoutHD
);

D2RMM.copyFile(
  'hd', // <mod folder>\hd
  'hd', // <diablo 2 folder>\mods\<modname>\<modname>.mpq\data\hd
  true // overwrite any conflicts
);
