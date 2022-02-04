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
    row.gridY = 8;
  }
});
D2RMM.writeTsv(inventoryFilename, inventory);

const profileHDFilename = 'global\\ui\\layouts\\_profilehd.json';
const profileHD = D2RMM.readJson(profileHDFilename);
profileHD.PlayerInventoryPanelRect = {
  x: -1394,
  y: 0,
  width: 1162,
  height: 1737,
};
profileHD.PlayerInventoryPanelGoldAmountRect = {
  x: 544,
  y: 1611,
  width: 249,
  height: 48,
};
profileHD.PlayerInventoryPanelGoldButtonRect = { x: 480, y: 1613 };
profileHD.RightPanelRectTopAligned = { ...profileHD.RightPanelRect, y: 0 };
D2RMM.writeJson(profileHDFilename, profileHD);

const profileLVFilename = 'global\\ui\\layouts\\_profilelv.json';
const profileLV = D2RMM.readJson(profileLVFilename);
profileLV.PlayerInventoryPanelRect = {
  x: -1346,
  y: 0,
  width: 1162,
  height: 1737,
  scale: 1.16,
};
profileLV.PlayerInventoryPanelGoldAmountRect = {
  x: 819,
  y: 1614,
  width: 249,
  height: 48,
};
profileLV.PlayerInventoryPanelGoldButtonRect = { x: 750, y: 1613 };
profileLV.RightPanelRectTopAligned = { ...profileLV.RightPanelRect, y: 0 };
D2RMM.writeJson(profileLVFilename, profileLV);

const playerInventoryOriginalLayoutFilename =
  'global\\ui\\layouts\\playerinventoryoriginallayout.json';
const playerInventoryOriginalLayout = D2RMM.readJson(
  playerInventoryOriginalLayoutFilename
);
playerInventoryOriginalLayout.fields.rect = {
  x: 0,
  y: 0,
  width: 320,
  height: 432,
};
playerInventoryOriginalLayout.fields.anchor = { x: 1.0, y: 0 };
playerInventoryOriginalLayout.children.forEach((child) => {
  if (child.name === 'click_catcher') {
    child.fields.rect.width = 1320;
    child.fields.rect.height = 2432;
  }
  if (child.name === 'grid') {
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
playerInventoryOriginalLayoutHD.fields.rect = '$RightPanelRectTopAligned';
playerInventoryOriginalLayoutHD.fields.anchor = { x: 1.0, y: 0 };
playerInventoryOriginalLayoutHD.children =
  playerInventoryOriginalLayoutHD.children.filter((child) => {
    if (child.name === 'click_catcher') {
      child.fields.rect = { x: 0, y: 0, width: 1162, height: 1737 };
    }
    if (child.name === 'background') {
      child.fields.filename = 'PANEL\\Inventory\\Background_Expanded2';
    }
    if (child.name === 'title') {
      return false;
    }
    if (child.name === 'gold_amount') {
      child.fields.rect = '$PlayerInventoryPanelGoldAmountRect';
    }
    if (child.name === 'gold_button') {
      child.fields.rect = '$PlayerInventoryPanelGoldButtonRect';
      child.fields.hoveredFrame = 0;
    }
    if (child.name === 'close') {
      child.fields.rect.x = 1080;
      child.fields.rect.y = 1;
    }
    if (child.name === 'grid') {
      child.fields.cellCount.y = 8;
      child.fields.rect.y = 819;
    }
    if (child.name === 'slot_head') {
      child.fields.rect.y = 105;
    }
    if (child.name === 'slot_neck') {
      child.fields.rect.y = 273;
    }
    if (child.name === 'slot_torso') {
      child.fields.rect.y = 348;
    }
    if (child.name === 'slot_right_arm') {
      child.fields.rect.x = 109;
      child.fields.rect.y = 152;
    }
    if (child.name === 'slot_left_arm') {
      child.fields.rect.x = 861;
      child.fields.rect.y = 152;
    }
    if (child.name === 'slot_right_hand') {
      child.fields.rect.y = 690;
    }
    if (child.name === 'slot_left_hand') {
      child.fields.rect.y = 689;
    }
    if (child.name === 'slot_belt') {
      child.fields.rect.y = 689;
    }
    if (child.name === 'slot_feet') {
      child.fields.rect.x = 860;
      child.fields.rect.y = 588;
    }
    if (child.name === 'slot_gloves') {
      child.fields.rect.y = 588;
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
      return false;
    }
    if (child.name === 'background') {
      child.fields.filename = 'PANEL\\Inventory\\Background_Expanded2';
    }
    if (child.name === 'background_right_arm_selected') {
      child.fields.rect.y = 100;
    }
    if (child.name === 'background_left_arm_selected') {
      child.fields.rect.y = 100;
    }
    if (child.name === 'background_right_arm') {
      child.fields.rect.y = 100;
    }
    if (child.name === 'background_left_arm') {
      child.fields.rect.y = 100;
    }
    if (child.name === 'text_i_left') {
      child.fields.rect.y = 100;
    }
    if (child.name === 'text_ii_left') {
      child.fields.rect.y = 100;
    }
    if (child.name === 'text_i_right') {
      child.fields.rect.y = 100;
    }
    if (child.name === 'text_ii_right') {
      child.fields.rect.y = 100;
    }
    if (child.name === 'weaponswap_right_arm') {
      child.fields.rect.y = 100;
    }
    if (child.name === 'weaponswap_left_arm') {
      child.fields.rect.y = 100;
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
      'Controller/Panel/InventoryPanel/V2/InventoryBG_Edit';
  }
  if (child.name === 'gold_amount') {
    child.fields.rect.y = 1729;
  }
  if (child.name === 'gold_button') {
    child.fields.rect.y = 1729;
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
      'Controller/Panel/InventoryPanel/V2/InventoryBG_Edit';
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
