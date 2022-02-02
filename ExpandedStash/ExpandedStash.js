const inventoryFilename = "global\\excel\\inventory.txt";
const inventory = await D2RMM.readTsv(inventoryFilename);
inventory.rows.forEach((row) => {
  const id = row["class"];
  if (
    id === "Bank Page 1" ||
    id === "Big Bank Page 1" ||
    id === "Bank Page2" ||
    id === "Big Bank Page2"
  ) {
    row["gridX"] = 16;
    row["gridY"] = 13;
  }
});
await D2RMM.writeTsv(inventoryFilename, inventory);

const profileHDFilename = "global\\ui\\layouts\\_profilehd.json";
const profileHD = await D2RMM.readJson(profileHDFilename);
profileHD.BankPanelRect = { x: 236, y: 210, width: 1750, height: 1799 };
profileHD.BankPanelGoldAmountRect = {
  x: 777,
  y: 1596,
  width: 249,
  height: 48,
};
profileHD.BankPanelGoldWithdrawRect = { x: 717, y: 1593 };
await D2RMM.writeJson(profileHDFilename, profileHD);

const profileLVFilename = "global\\ui\\layouts\\_profilelv.json";
const profileLV = await D2RMM.readJson(profileLVFilename);
profileLV.BankPanelRect = {
  x: 0,
  y: 0,
  width: 1750,
  height: 1799,
  scale: 1.16,
};
profileLV.BankPanelGoldAmountRect = {
  x: 1135,
  y: 1596,
  width: 249,
  height: 48,
};
profileLV.BankPanelGoldWithdrawRect = { x: 1080, y: 1593 };
await D2RMM.writeJson(profileLVFilename, profileLV);

const bankOriginalLayoutFilename =
  "global\\ui\\layouts\\bankoriginallayout.json";
const bankOriginalLayout = await D2RMM.readJson(bankOriginalLayoutFilename);
bankOriginalLayout.children.forEach((child) => {
  if (child.name === "grid") {
    child.fields.cellCount.x = 16;
    child.fields.cellCount.y = 13;
  }
});
await D2RMM.writeJson(bankOriginalLayoutFilename, bankOriginalLayout);

const bankOriginalLayoutHDFilename =
  "global\\ui\\layouts\\bankoriginallayouthd.json";
const bankOriginalLayoutHD = await D2RMM.readJson(bankOriginalLayoutHDFilename);
bankOriginalLayoutHD.children.forEach((child) => {
  if (child.name === "grid") {
    child.fields.cellCount.x = 16;
    child.fields.cellCount.y = 13;
  }
  if (child.name === "click_catcher") {
    child.fields.rect = { x: 0, y: 0, width: 1750, height: 1799 };
  }
  if (child.name === "background") {
    child.fields.filename = "PANEL\\\\Stash\\\\StashPanel_BG2";
    child.fields.rect = { x: 0, y: 0 };
  }
  if (child.name === "title") {
    child.fields.rect = { x: 877, y: 100 };
  }
  if (child.name === "gold_amount") {
    child.fields.rect = "$BankPanelGoldAmountRect";
  }
  if (child.name === "gold_withdraw") {
    child.fields.rect = "$BankPanelGoldWithdrawRect";
  }
  if (child.name === "close") {
    child.fields.rect.x = 1675;
    child.fields.rect.y = 0;
  }
});
bankOriginalLayoutHD.children.push({
  type: "TabBarWidget",
  name: "BankTabs",
  fields: {
    rect: { x: 93, y: 160 },
    tabCount: 6,
    filename: "PANEL\\\\stash\\\\Stash_Tabs",
    inactiveFrames: [0, 0, 0, 0, 0, 0],
    activeFrames: [1, 1, 1, 1, 1, 1],
    disabledFrames: [0, 0, 0, 0, 0, 0],
    textStrings: [
      "@personal",
      "Classic",
      "Classic",
      "Classic",
      "Classic",
      "Classic",
    ],
    textStyle: { pointSize: "$SmallPanelFontSize" },
    activeTextColor: "$TabsActiveTextColor",
    inactiveTextColor: "$TabsInactiveTextColor",
    tabSize: { x: 249, y: 75 },
    tabPadding: { x: 12, y: 0 },
    onSwitchTabMessage: "BankPanelMessage:SelectTab",
  },
});
await D2RMM.writeJson(bankOriginalLayoutHDFilename, bankOriginalLayoutHD);

const bankExpansionLayoutFilename =
  "global\\ui\\layouts\\bankexpansionlayout.json";
const bankExpansionLayout = await D2RMM.readJson(bankExpansionLayoutFilename);
bankExpansionLayout.children.forEach((child) => {
  if (child.name === "grid") {
    child.fields.cellCount.x = 16;
    child.fields.cellCount.y = 13;
  }
  if (child.name === "BankTabs") {
    child.fields.tabCount = 8;
    child.fields.textStrings = [
      "@personal",
      "@shared",
      "@shared",
      "@shared",
      "@shared",
      "@shared",
      "@shared",
      "@shared",
    ];
  }
});
await D2RMM.writeJson(bankExpansionLayoutFilename, bankExpansionLayout);

const bankExpansionLayoutHDFilename =
  "global\\ui\\layouts\\bankexpansionlayouthd.json";
const bankExpansionLayoutHD = await D2RMM.readJson(
  bankExpansionLayoutHDFilename
);
bankExpansionLayoutHD.children.forEach((child) => {
  if (child.name === "grid") {
    child.fields.cellCount.x = 16;
    child.fields.cellCount.y = 13;
  }
  if (child.name === "gold_amount") {
    delete child.fields;
  }
  if (child.name === "gold_withdraw") {
    delete child.fields;
  }
  if (child.name === "background") {
    child.fields.filename = "PANEL\\\\Stash\\\\StashPanel_BG2";
  }
  if (child.name === "BankTabs") {
    child.fields.filename = "PANEL\\\\stash\\\\Stash_Tabs_Blank";
    child.fields.tabCount = 8;
    child.fields.rect.y = 160;
    child.fields.tabSize.x = 195;
    child.fields.tabPadding.x = 4;
    child.fields.inactiveFrames = [0, 0, 0, 0, 0, 0, 0, 0];
    child.fields.activeFrames = [1, 1, 1, 1, 1, 1, 1, 1];
    child.fields.disabledFrames = [0, 0, 0, 0, 0, 0, 0, 0];
    child.fields.textStrings = [
      "@personal",
      "@shared",
      "@shared",
      "@shared",
      "@shared",
      "@shared",
      "@shared",
      "@shared",
    ];
  }
});
await D2RMM.writeJson(bankExpansionLayoutHDFilename, bankExpansionLayoutHD);

const bankOriginalControllerLayoutHDFilename =
  "global\\ui\\layouts\\controller\\bankoriginallayouthd.json";
const bankOriginalControllerLayoutHD = await D2RMM.readJson(
  bankOriginalControllerLayoutHDFilename
);
bankOriginalControllerLayoutHD.children.forEach((child) => {
  if (child.name === "background") {
    child.fields.filename = "Controller/Panel/Stash/V2/StashPanelBG_Edit";
    child.fields.rect.x = -325;
    child.fields.rect.y = 160;
  }
  if (child.name === "gold_max") {
    child.fields.rect.x = 314;
    child.fields.rect.y = 1722;
  }
  if (child.name === "gold_amount") {
    child.fields.rect.x = 389;
    child.fields.rect.y = 1627;
    child.fields.rect.width = 242;
    child.fields.rect.height = 59;
  }
  if (child.name === "gold_withdraw") {
    child.fields.rect.x = 328;
    child.fields.rect.y = 1624;
    child.fields.rect.height = 59;
  }
  if (child.name === "grid") {
    child.fields.rect.x = -295;
    child.fields.rect.y = 273;
  }
});
await D2RMM.writeJson(
  bankOriginalControllerLayoutHDFilename,
  bankOriginalControllerLayoutHD
);

const bankExpansionControllerLayoutHDFilename =
  "global\\ui\\layouts\\controller\\bankexpansionlayouthd.json";
const bankExpansionControllerLayoutHD = await D2RMM.readJson(
  bankExpansionControllerLayoutHDFilename
);
bankExpansionControllerLayoutHD.children.forEach((child) => {
  if (child.name === "background") {
    child.fields.filename = "Controller/Panel/Stash/V2/StashPanelBG_Edit";
    child.fields.rect.x = -325;
    child.fields.rect.y = 160;
  }
  if (child.name === "gold_max") {
    child.fields.rect.x = 314;
    child.fields.rect.y = 1722;
  }
  if (child.name === "gold_amount") {
    child.fields.rect.x = 389;
    child.fields.rect.y = 1627;
    child.fields.rect.width = 250;
    child.fields.rect.height = 59;
  }
  if (child.name === "gold_withdraw") {
    child.fields.rect.x = 328;
    child.fields.rect.y = 1624;
    child.fields.rect.width = 304;
    child.fields.rect.height = 59;
  }
  if (child.name === "grid") {
    child.fields.rect.x = -295;
    child.fields.rect.y = 273;
    child.fields.cellCount.x = 16;
    child.fields.cellCount.y = 13;
  }
});
await D2RMM.writeJson(
  bankExpansionControllerLayoutHDFilename,
  bankExpansionControllerLayoutHD
);

await D2RMM.copyFile(
  "hd", // <mod folder>\hd
  "hd", // <diablo 2 folder>\mods\<modname>\<modname>.mpq\data\hd
  true // overwrite any conflicts
);
