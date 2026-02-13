if (D2RMM.getVersion == null || D2RMM.getVersion() < 1.6) {
  D2RMM.error('Requires D2RMM version 1.6 or higher.');
  return;
}

['global\\excel\\inventory.txt', 'global\\excel\\base\\inventory.txt'].forEach(
  (fileName) => {
    const fileContent = D2RMM.readTsv(fileName);
    if (!fileContent) return;
    fileContent.rows.forEach((row) => {
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
    D2RMM.writeTsv(fileName, fileContent);
  },
);

{
  const fileName = 'global\\ui\\layouts\\_profilehd.json';
  const fileContent = D2RMM.readJson(fileName);
  fileContent.LeftPanelRect_ExpandedStash = {
    x: 236,
    y: -651,
    width: 1687,
    height: 1507,
  };
  fileContent.PanelClickCatcherRect_ExpandedStash = {
    x: 0,
    y: 0,
    width: 1687,
    height: 1507,
  };
  // offset the left hinge so that it doesn't overlap with content of the left panel
  fileContent.LeftHingeRect = { x: -236 - 25, y: 630 };
  D2RMM.writeJson(fileName, fileContent);
}

{
  const fileName = 'global\\ui\\layouts\\_profilelv.json';
  const fileContent = D2RMM.readJson(fileName);
  fileContent.LeftPanelRect_ExpandedStash = {
    x: 0,
    y: -856,
    width: 1687,
    height: 1507,
    scale: 1.16,
  };
  D2RMM.writeJson(fileName, fileContent);
}

{
  const fileName = 'global\\ui\\layouts\\bankoriginallayouthd.json';
  const fileContent = D2RMM.readJson(fileName);
  function processLayoutNode(node) {
    if (!node || typeof node !== 'object') return true;
    const name = node.name;

    if (name === 'BankOriginalLayout' && node.fields) {
      node.fields.rect = '$LeftPanelRect_ExpandedStash';
    }

    if (name === 'grid') {
      node.fields.cellCount.x = 16;
      node.fields.cellCount.y = 13;
      if (node.fields.rect) {
        node.fields.rect.x = node.fields.rect.x - 229;
        node.fields.rect.y = node.fields.rect.y - 572;
      }
    }

    if (name === 'click_catcher' && node.fields) {
      node.fields.rect = '$PanelClickCatcherRect_ExpandedStash';
    }

    if (name === 'background' && node.fields) {
      node.fields.filename = 'PANEL\\Stash\\StashPanel_BG_Expanded';
      node.fields.rect = { x: 0, y: 0 };
    }

    if (name === 'gold_amount' && node.fields && node.fields.rect) {
      node.fields.rect.x = 60 + 60 + 16;
      node.fields.rect.y = 61 + 16;
    }

    if (name === 'gold_withdraw' && node.fields && node.fields.rect) {
      node.fields.rect.x = 60 + 16;
      node.fields.rect.y = 58 + 16;
    }

    if (name === 'title' && node.fields && node.fields.rect) {
      node.fields.rect = {
        x: 91 + (1687 - 1162) / 2,
        y: 64,
        width: 972,
        height: 71,
      };
    }

    if (name === 'close' && node.fields && node.fields.rect) {
      node.fields.rect.x = node.fields.rect.x + (1687 - 1162);
    }

    return true;
  }
  processLayoutNode(fileContent);
  D2RMM.writeJson(fileName, fileContent);
}

{
  const fileName = 'global\\ui\\layouts\\bankexpansionlayouthd.json';
  const fileContent = D2RMM.readJson(fileName);
  function processLayoutNode(node) {
    if (!node || typeof node !== 'object') return true;
    const name = node.name;

    if (
      name === 'PreviousSeasonToggleDisplay' ||
      name === 'PreviousLadderSeasonBankTabs'
    ) {
      return false;
    }

    if (name === 'title') {
      return false;
    }

    if (
      name === 'BankExpansionLayout' &&
      node.fields &&
      node.fields.backgroundFile
    ) {
      node.fields.backgroundFile = node.fields.backgroundFile.map((file) =>
        [
          'PANEL\\Stash\\StashPanel_BG_Personal',
          'PANEL\\Stash\\StashPanel_BG_Shared',
        ].includes(file)
          ? 'PANEL\\Stash\\StashPanel_BG_Expanded'
          : file,
      );
    }

    if (name === 'grid' && node.fields) {
      if (!node.fields.cellCount) node.fields.cellCount = {};
      node.fields.cellCount.x = 16;
      node.fields.cellCount.y = 13;
      if (!node.fields.rect) node.fields.rect = {};
      if (typeof node.fields.rect.x === 'number') {
        node.fields.rect.x = node.fields.rect.x - 37 + 6;
      }
      if (typeof node.fields.rect.y === 'number') {
        node.fields.rect.y = node.fields.rect.y - 58 + 16;
      }
    }

    if (name === 'background' && node.fields) {
      node.fields.filename = 'PANEL\\Stash\\StashPanel_BG_Expanded';
    }

    if (name === 'BankTabs' && node.fields) {
      node.fields.filename = 'PANEL\\stash\\Stash_Tabs_Expanded';
      if (!node.fields.rect) node.fields.rect = {};
      if (typeof node.fields.rect.x === 'number')
        node.fields.rect.x = node.fields.rect.x - 30 - 2;
      if (typeof node.fields.rect.y === 'number')
        node.fields.rect.y = node.fields.rect.y - 56 + 18;
      node.fields.tabSize = { x: 197, y: 75 };
      node.fields.tabPadding = { x: 0, y: 0 };
    }

    if (name === 'gold_amount' && node.fields && node.fields.rect) {
      node.fields.rect.x = 60 + 60;
      node.fields.rect.y = 61;
    }

    if (name === 'gold_withdraw' && node.fields && node.fields.rect) {
      node.fields.rect.x = 60;
      node.fields.rect.y = 58;
    }

    if (name === 'StashNavigation' && node.fields && node.fields.rect) {
      node.fields.rect.y = 30;
    }

    if (Array.isArray(node.children)) {
      node.children = node.children.filter((child) => processLayoutNode(child));
    }

    return true;
  }
  processLayoutNode(fileContent);
  D2RMM.writeJson(fileName, fileContent);
}

{
  const fileName = 'global\\ui\\layouts\\controller\\controlleroverlayhd.json';
  const fileContent = D2RMM.readJson(fileName);
  fileContent.children.forEach((child) => {
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
  D2RMM.writeJson(fileName, fileContent);
}

{
  const fileName = 'global\\ui\\layouts\\controller\\bankoriginallayouthd.json';
  const fileContent = D2RMM.readJson(fileName);
  function processLayoutNode(node) {
    if (!node || typeof node !== 'object') return true;
    const name = node.name;

    if (name === 'background') {
      node.fields.filename =
        'Controller/Panel/Stash/V2/Classic_StashPanelBG_Expanded';
      node.fields.rect.x = node.fields.rect.x - 285 - 81 - 2 - 120;
      node.fields.rect.y = node.fields.rect.y + 17 - 293 + 100;
    }

    if (name === 'gold_amount' || name === 'gold_withdraw') {
      node.fields.rect.x = node.fields.rect.x - 476 - 280;
      node.fields.rect.y = node.fields.rect.y - 1404 + 30;
    }

    if (name === 'gold_max') {
      node.fields.rect.x = node.fields.rect.x - 476 + 927;
      node.fields.rect.y = node.fields.rect.y - 1404 - 90 + 25;
    }

    if (name === 'grid') {
      node.fields.rect.x = -285 + 9;
      node.fields.rect.y = 119;
    }

    if (Array.isArray(node.children)) {
      node.children = node.children.filter((child) => processLayoutNode(child));
    }

    return true;
  }
  processLayoutNode(fileContent);
  D2RMM.writeJson(fileName, fileContent);
}

{
  const fileName =
    'global\\ui\\layouts\\controller\\bankexpansionlayouthd.json';
  const fileContent = D2RMM.readJson(fileName);
  function processLayoutNode(node) {
    if (!node || typeof node !== 'object') return true;
    const name = node.name;

    if (
      name === 'PreviousSeasonToggleDisplay' ||
      name === 'PreviousLadderSeasonBankTabs'
    ) {
      return false;
    }

    if (
      name === 'BankExpansionLayout' &&
      node.fields &&
      node.fields.backgroundFile
    ) {
      node.fields.backgroundFile = node.fields.backgroundFile.map((file) =>
        [
          'Controller/Panel/Stash/V2/StashPanelBGPersonal',
          'Controller/Panel/Stash/V2/StashPanelBGShared',
        ].includes(file)
          ? 'Controller/Panel/Stash/V2/StashPanelBG_Expanded'
          : file,
      );
    }

    if (name === 'background') {
      node.fields.filename = 'Controller/Panel/Stash/V2/StashPanelBG_Expanded';
      node.fields.rect.x = node.fields.rect.x - 285 - 81;
      node.fields.rect.y = node.fields.rect.y + 17 - 293;
    }

    if (name === 'gold_withdraw') {
      node.fields.rect.x = -220;
      node.fields.rect.y = -140;
    }

    if (name === 'gold_amount') {
      node.fields.rect.x = -220 + 39;
      node.fields.rect.y = -140 - 8;
    }

    if (name === 'gold_max') {
      node.fields.rect.x = 905;
      node.fields.rect.y = -150;
    }

    if (name === 'grid') {
      node.fields.cellCount.x = 16;
      node.fields.cellCount.y = 13;
      node.fields.rect.x = -276;
      node.fields.rect.y = 119;
    }

    if (name === 'BankTabs') {
      node.fields.filename = 'Controller/Panel/Stash/V2/StashTabs_Expanded';
      node.fields.focusIndicatorFilename =
        'Controller/HoverImages/StashTab_Hover_Expanded';
      node.fields.rect.x = node.fields.rect.x - 300;
      node.fields.rect.y = node.fields.rect.y + 10;
      node.fields.tabSize = { x: 175, y: 120 };
      node.fields.tabPadding = { x: 0, y: 0 };
      node.fields.tabLeftIndicatorPosition = { x: -42, y: -2 };
      node.fields.tabRightIndicatorPosition = { x: 1135 + 300, y: -2 };
    }

    if (name === 'StashNavigation' && node.fields && node.fields.rect) {
      node.fields.rect.x = 100;
      node.fields.rect.y = 1490;
    }

    if (Array.isArray(node.children)) {
      node.children = node.children.filter((child) => processLayoutNode(child));
    }

    return true;
  }
  processLayoutNode(fileContent);
  D2RMM.writeJson(fileName, fileContent);
}

D2RMM.copyFile(
  'hd', // <mod folder>\hd
  'hd', // <diablo 2 folder>\mods\<modname>\<modname>.mpq\data\hd
  true, // overwrite any conflicts
);
