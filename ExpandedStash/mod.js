if (D2RMM.getVersion == null || D2RMM.getVersion() < 1.6) {
  D2RMM.error('Requires D2RMM version 1.6 or higher.');
  return;
}

const CELL_OFFSET_X = 3;
const CELL_OFFSET_Y = 2;

function findNode(node, name) {
  if (!node || typeof node !== 'object') {
    return nodeMap;
  }

  if (node.name === name) {
    return node;
  }

  if (Array.isArray(node.children)) {
    for (const child of node.children) {
      const childResult = findNode(child, name);
      if (childResult) {
        return childResult;
      }
    }
  }

  return null;
}

function processNodes(node, handler) {
  if (!node || typeof node !== 'object') return true;

  if (!handler(node.name, node)) {
    return false;
  }

  if (Array.isArray(node.children)) {
    node.children = node.children.filter((child) =>
      processNodes(child, handler),
    );
  }

  return true;
}

['global\\excel\\inventory.txt', 'global\\excel\\base\\inventory.txt'].forEach(
  (fileName) => {
    const fileContent = D2RMM.readTsv(fileName);
    if (!fileContent) return;
    fileContent.rows.forEach((row) => {
      const id = row.class;
      if (
        // Original (6x4)
        id === 'Bank Page 1' ||
        id === 'Bank Page2' ||
        // Expansion (10x10)
        id === 'Big Bank Page 1' ||
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
  processNodes(fileContent, (name, node) => {
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
      node.fields.filename = 'PANEL\\Stash\\BasicStash_Expanded';
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
      node.fields.rect.x += 1687 - 1162;
    }

    return true;
  });
  D2RMM.writeJson(fileName, fileContent);
}

{
  const fileName = 'global\\ui\\layouts\\bankexpansionlayouthd.json';
  const fileContent = D2RMM.readJson(fileName);
  processNodes(fileContent, (name, node) => {
    if (
      name === 'PreviousSeasonToggleDisplay' ||
      name === 'PreviousLadderSeasonBankTabs'
    ) {
      return false;
    }

    if (name === 'title') {
      return false;
    }

    // for materials and runes advanced stash tabs, remove their contents
    if (['advancedstash_materials', 'advancedstash_runes'].includes(name)) {
      node.children = [];
    }

    // for gems advanced stash tab, apply the new layout
    if (name === 'advancedstash_gems') {
      node.children = [];

      // add gems
      {
        const itemCodes = [
          'gcw',
          'gfw',
          'gsw',
          'glw',
          'gpw',
          'gcg',
          'gfg',
          'gsg',
          'glg',
          'gpg',
          'gcr',
          'gfr',
          'gsr',
          'glr',
          'gpr',
          'gcy',
          'gfy',
          'gsy',
          'gly',
          'gpy',
          'gcv',
          'gfv',
          'gsv',
          'gzv',
          'gpv',
          'gcb',
          'gfb',
          'gsb',
          'glb',
          'gpb',
          'skc',
          'skf',
          'sku',
          'skl',
          'skz',
        ];
        const x = 97 + CELL_OFFSET_X;
        const y = 909 + CELL_OFFSET_Y;
        for (const index in itemCodes) {
          const itemCode = itemCodes[index];
          node.children.push({
            type: 'AdvancedStashSlotWidget',
            name: itemCode,
            fields: {
              rect: {
                width: 98,
                height: 98,
                x: x + Math.floor(index / 5) * 100,
                y: y + (index % 5) * 100,
              },
              itemCode,
            },
          });
        }
      }

      // add runes
      {
        const x = 887 + CELL_OFFSET_X;
        const y = 909 + CELL_OFFSET_Y;
        for (let index = 0; index < 33; index++) {
          const itemCode = `r${(index + 1).toString().padStart(2, '0')}`;
          node.children.push({
            type: 'AdvancedStashSlotWidget',
            name: itemCode,
            fields: {
              rect: {
                width: 98,
                height: 98,
                x: x + ((index % 7) + (index >= 28 ? 1 : 0)) * 100,
                y: y + Math.floor(index / 7) * 100,
              },
              itemCode,
            },
          });
        }
      }

      // add statues
      {
        const x = 97 + CELL_OFFSET_X;
        const y = 195 + CELL_OFFSET_Y;
        const itemCodes = ['ua1', 'ua2', 'ua3', 'ua4', 'ua5'];
        for (const index in itemCodes) {
          const itemCode = itemCodes[index];
          node.children.push({
            type: 'AdvancedStashSlotWidget',
            name: itemCode,
            fields: {
              rect: {
                width: 98,
                height: 196,
                x: x + index * 100,
                y,
              },
              itemCode,
            },
          });
        }
      }

      // add keys
      {
        const x = 627 + CELL_OFFSET_X;
        const y = 195 + CELL_OFFSET_Y;
        const itemCodes = ['pk1', 'pk2', 'pk3'];
        for (const index in itemCodes) {
          const itemCode = itemCodes[index];
          node.children.push({
            type: 'AdvancedStashSlotWidget',
            name: itemCode,
            fields: {
              rect: {
                width: 98,
                height: 196,
                x: x + index * 100,
                y,
              },
              itemCode,
            },
          });
        }
      }

      // add potions
      {
        const x = 957 + CELL_OFFSET_X;
        const y = 195 + CELL_OFFSET_Y;
        const itemCodes = ['rvs', 'rvl'];
        for (const index in itemCodes) {
          const itemCode = itemCodes[index];
          node.children.push({
            type: 'AdvancedStashSlotWidget',
            name: itemCode,
            fields: {
              rect: {
                width: 98,
                height: 98,
                x,
                y: y + index * 100,
              },
              itemCode,
            },
          });
        }
      }

      // add shards
      {
        const x = 1087 + CELL_OFFSET_X;
        const y = 195 + CELL_OFFSET_Y;
        const itemCodes = ['xa1', 'xa2', 'xa3', 'xa4', 'xa5'];
        for (const index in itemCodes) {
          const itemCode = itemCodes[index];
          node.children.push({
            type: 'AdvancedStashSlotWidget',
            name: itemCode,
            fields: {
              rect: {
                width: 98,
                height: 98,
                x: x + index * 100,
                y,
              },
              itemCode,
            },
          });
        }
      }

      // add essences
      {
        const x = 1087 + CELL_OFFSET_X;
        const y = 295 + CELL_OFFSET_Y;
        const itemCodes = ['toa', 'tes', 'ceh', 'bet', 'fed'];
        for (const index in itemCodes) {
          const itemCode = itemCodes[index];
          node.children.push({
            type: 'AdvancedStashSlotWidget',
            name: itemCode,
            fields: {
              rect: {
                width: 98,
                height: 98,
                x: x + index * 100,
                y,
              },
              itemCode,
            },
          });
        }
      }

      // add organs
      {
        const x = 1287 + CELL_OFFSET_X;
        const y = 395 + CELL_OFFSET_Y;
        const itemCodes = ['dhn', 'bey', 'mbr'];
        for (const index in itemCodes) {
          const itemCode = itemCodes[index];
          node.children.push({
            type: 'AdvancedStashSlotWidget',
            name: itemCode,
            fields: {
              rect: {
                width: 98,
                height: 98,
                x: x + index * 100,
                y,
              },
              itemCode,
            },
          });
        }
      }
    }

    if (name === 'horadriccube_grid' && node.fields) {
      if (!node.fields.rect) node.fields.rect = {};
      node.fields.rect.x = 551;
      node.fields.rect.y = 450;
    }

    if (name === 'horadriccube_cover' && node.fields) {
      if (!node.fields.rect) node.fields.rect = {};
      node.fields.rect.x = 552;
      node.fields.rect.y = 451;
    }

    if (name === 'convert' && node.fields) {
      if (!node.fields.rect) node.fields.rect = {};
      node.fields.rect.x = 382;
      node.fields.rect.y = 589;
    }

    // TODO: withdraw_button inside of horadric cube - what is it? (398, 1381)

    if (
      name === 'BankExpansionLayout' &&
      node.fields &&
      node.fields.backgroundFile
    ) {
      const basicStashTabBackground = 'PANEL\\Stash\\BasicStash_Expanded';
      const isExpandedCubeInstalled =
        findNode(fileContent, 'horadriccube_grid')?.fields?.cellCount?.x === 6;
      console.debug(
        isExpandedCubeInstalled
          ? 'Found Expanded Cube mod. Defaulting to expanded cube sprites.'
          : 'Did not find Expanded Cube mod. Defaulting to normal cube sprites.',
        findNode(fileContent, 'horadriccube_grid'),
      );
      const advancedStashTabBackground = isExpandedCubeInstalled
        ? 'PANEL\\Stash\\AdvancedStash_Expanded_Cube'
        : 'PANEL\\Stash\\AdvancedStash_Expanded';
      node.fields.backgroundFile = node.fields.backgroundFile.map(
        (file) =>
          ({
            'PANEL\\Stash\\StashPanel_BG_Personal': basicStashTabBackground,
            'PANEL\\Stash\\StashPanel_BG_Shared': basicStashTabBackground,
            'PANEL\\Stash\\AdditionalStash\\PANEL_AdditionalStash_Gems':
              advancedStashTabBackground,
            'PANEL\\Stash\\AdditionalStash\\PANEL_AdditionalStash_Consumables':
              advancedStashTabBackground,
            'PANEL\\Stash\\AdditionalStash\\PANEL_AdditionalStash_Runes':
              advancedStashTabBackground,
          })[file] ?? file,
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
      node.fields.filename = 'PANEL\\Stash\\BasicStash_Expanded';
    }

    if (name === 'BankTabs' && node.fields) {
      if (!node.fields.rect) node.fields.rect = {};
      if (typeof node.fields.rect.x === 'number')
        node.fields.rect.x = node.fields.rect.x - 30 - 2;
      if (typeof node.fields.rect.y === 'number')
        node.fields.rect.y = node.fields.rect.y - 56 + 18;
      node.fields.tabSize = { x: 197, y: 75 };
      node.fields.tabPadding = { x: 0, y: 0 };

      // hide gems and runes advanced stash tabs from the tab list
      // we keep the materials stash tab since it has the most
      // appropriate default localization
      const indices = [
        node.fields.textStrings.indexOf('@gems'),
        node.fields.textStrings.indexOf('@runes'),
      ].filter((index) => index !== -1);
      node.fields.tabCount -= indices.length;
      node.fields.inactiveFrames = node.fields.inactiveFrames.filter(
        (_, i) => !indices.includes(i),
      );
      node.fields.activeFrames = node.fields.activeFrames.filter(
        (_, i) => !indices.includes(i),
      );
      node.fields.disabledFrames = node.fields.disabledFrames.filter(
        (_, i) => !indices.includes(i),
      );
      node.fields.textStrings = node.fields.textStrings.filter(
        (_, i) => !indices.includes(i),
      );
    }

    if (name === 'gold_amount' && node.fields && node.fields.rect) {
      node.fields.rect.x = 1254 + 60;
      node.fields.rect.y = 61;
    }

    if (name === 'gold_withdraw' && node.fields && node.fields.rect) {
      node.fields.rect.x = 1254;
      node.fields.rect.y = 58;
    }

    if (name === 'StashNavigation' && node.fields && node.fields.rect) {
      node.fields.rect.x = 129;
      node.fields.rect.y = 37;
    }

    return true;
  });
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

const CONTROLLER_PANEL_OFFSET_X = -368;
const CONTROLLER_PANEL_OFFSET_Y = -176;

{
  const fileName = 'global\\ui\\layouts\\controller\\bankoriginallayouthd.json';
  const fileContent = D2RMM.readJson(fileName);
  processNodes(fileContent, (name, node) => {
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

    return true;
  });
  D2RMM.writeJson(fileName, fileContent);
}

{
  const fileName =
    'global\\ui\\layouts\\controller\\bankexpansionlayouthd.json';
  const fileContent = D2RMM.readJson(fileName);
  processNodes(fileContent, (name, node) => {
    if (
      name === 'PreviousSeasonToggleDisplay' ||
      name === 'PreviousLadderSeasonBankTabs'
    ) {
      return false;
    }

    // for materials and runes advanced stash tabs, remove their contents
    if (['advancedstash_materials', 'advancedstash_runes'].includes(name)) {
      node.children = [];
    }

    // for gems advanced stash tab, apply the new layout
    if (name === 'advancedstash_gems') {
      node.children = [];

      // add gems
      {
        const itemCodes = [
          'gcw',
          'gfw',
          'gsw',
          'glw',
          'gpw',
          'gcg',
          'gfg',
          'gsg',
          'glg',
          'gpg',
          'gcr',
          'gfr',
          'gsr',
          'glr',
          'gpr',
          'gcy',
          'gfy',
          'gsy',
          'gly',
          'gpy',
          'gcv',
          'gfv',
          'gsv',
          'gzv',
          'gpv',
          'gcb',
          'gfb',
          'gsb',
          'glb',
          'gpb',
          'skc',
          'skf',
          'sku',
          'skl',
          'skz',
        ];
        const x = 130 + CELL_OFFSET_X + CONTROLLER_PANEL_OFFSET_X;
        const y = 1028 + CELL_OFFSET_Y + CONTROLLER_PANEL_OFFSET_Y;
        for (const index in itemCodes) {
          const itemCode = itemCodes[index];
          node.children.push({
            type: 'AdvancedStashSlotWidget',
            name: itemCode,
            fields: {
              rect: {
                width: 98,
                height: 98,
                x: x + Math.floor(index / 5) * 100,
                y: y + (index % 5) * 100,
              },
              itemCode,
            },
          });
        }
      }

      // add runes
      {
        const x = 920 + CELL_OFFSET_X + CONTROLLER_PANEL_OFFSET_X;
        const y = 1028 + CELL_OFFSET_Y + CONTROLLER_PANEL_OFFSET_Y;
        for (let index = 0; index < 33; index++) {
          const itemCode = `r${(index + 1).toString().padStart(2, '0')}`;
          node.children.push({
            type: 'AdvancedStashSlotWidget',
            name: itemCode,
            fields: {
              rect: {
                width: 98,
                height: 98,
                x: x + ((index % 7) + (index >= 28 ? 1 : 0)) * 100,
                y: y + Math.floor(index / 7) * 100,
              },
              itemCode,
            },
          });
        }
      }

      // add statues
      {
        const x = 130 + CELL_OFFSET_X + CONTROLLER_PANEL_OFFSET_X;
        const y = 314 + CELL_OFFSET_Y + CONTROLLER_PANEL_OFFSET_Y;
        const itemCodes = ['ua1', 'ua2', 'ua3', 'ua4', 'ua5'];
        for (const index in itemCodes) {
          const itemCode = itemCodes[index];
          node.children.push({
            type: 'AdvancedStashSlotWidget',
            name: itemCode,
            fields: {
              rect: {
                width: 98,
                height: 196,
                x: x + index * 100,
                y,
              },
              itemCode,
            },
          });
        }
      }

      // add keys
      {
        const x = 660 + CELL_OFFSET_X + CONTROLLER_PANEL_OFFSET_X;
        const y = 314 + CELL_OFFSET_Y + CONTROLLER_PANEL_OFFSET_Y;
        const itemCodes = ['pk1', 'pk2', 'pk3'];
        for (const index in itemCodes) {
          const itemCode = itemCodes[index];
          node.children.push({
            type: 'AdvancedStashSlotWidget',
            name: itemCode,
            fields: {
              rect: {
                width: 98,
                height: 196,
                x: x + index * 100,
                y,
              },
              itemCode,
            },
          });
        }
      }

      // add potions
      {
        const x = 990 + CELL_OFFSET_X + CONTROLLER_PANEL_OFFSET_X;
        const y = 314 + CELL_OFFSET_Y + CONTROLLER_PANEL_OFFSET_Y;
        const itemCodes = ['rvs', 'rvl'];
        for (const index in itemCodes) {
          const itemCode = itemCodes[index];
          node.children.push({
            type: 'AdvancedStashSlotWidget',
            name: itemCode,
            fields: {
              rect: {
                width: 98,
                height: 98,
                x,
                y: y + index * 100,
              },
              itemCode,
            },
          });
        }
      }

      // add shards
      {
        const x = 1120 + CELL_OFFSET_X + CONTROLLER_PANEL_OFFSET_X;
        const y = 314 + CELL_OFFSET_Y + CONTROLLER_PANEL_OFFSET_Y;
        const itemCodes = ['xa1', 'xa2', 'xa3', 'xa4', 'xa5'];
        for (const index in itemCodes) {
          const itemCode = itemCodes[index];
          node.children.push({
            type: 'AdvancedStashSlotWidget',
            name: itemCode,
            fields: {
              rect: {
                width: 98,
                height: 98,
                x: x + index * 100,
                y,
              },
              itemCode,
            },
          });
        }
      }

      // add essences
      {
        const x = 1120 + CELL_OFFSET_X + CONTROLLER_PANEL_OFFSET_X;
        const y = 414 + CELL_OFFSET_Y + CONTROLLER_PANEL_OFFSET_Y;
        const itemCodes = ['toa', 'tes', 'ceh', 'bet', 'fed'];
        for (const index in itemCodes) {
          const itemCode = itemCodes[index];
          node.children.push({
            type: 'AdvancedStashSlotWidget',
            name: itemCode,
            fields: {
              rect: {
                width: 98,
                height: 98,
                x: x + index * 100,
                y,
              },
              itemCode,
            },
          });
        }
      }

      // add organs
      {
        const x = 1320 + CELL_OFFSET_X + CONTROLLER_PANEL_OFFSET_X;
        const y = 514 + CELL_OFFSET_Y + CONTROLLER_PANEL_OFFSET_Y;
        const itemCodes = ['dhn', 'bey', 'mbr'];
        for (const index in itemCodes) {
          const itemCode = itemCodes[index];
          node.children.push({
            type: 'AdvancedStashSlotWidget',
            name: itemCode,
            fields: {
              rect: {
                width: 98,
                height: 98,
                x: x + index * 100,
                y,
              },
              itemCode,
            },
          });
        }
      }
    }

    if (name === 'advancedstash_horadriccube' && node.fields) {
      if (!node.fields.rect) node.fields.rect = {};
      node.fields.rect.x = 0;
      node.fields.rect.y = 0;
    }

    if (name === 'horadriccube_grid' && node.fields) {
      if (!node.fields.rect) node.fields.rect = {};
      node.fields.rect.x = 581 + CONTROLLER_PANEL_OFFSET_X;
      node.fields.rect.y = 568 + CONTROLLER_PANEL_OFFSET_Y;
    }

    if (name === 'horadriccube_cover' && node.fields) {
      if (!node.fields.rect) node.fields.rect = {};
      node.fields.rect.x = 582 + CONTROLLER_PANEL_OFFSET_X;
      node.fields.rect.y = 569 + CONTROLLER_PANEL_OFFSET_Y;
    }

    if (name === 'convert' && node.fields) {
      if (!node.fields.rect) node.fields.rect = {};
      node.fields.rect.x = 412 + CONTROLLER_PANEL_OFFSET_X;
      node.fields.rect.y = 707 + CONTROLLER_PANEL_OFFSET_Y;
    }

    // TODO: withdraw_button inside of horadric cube - what is it?

    if (
      name === 'BankExpansionLayout' &&
      node.fields &&
      node.fields.backgroundFile
    ) {
      const basicStashTabBackground =
        'Controller/Panel/Stash/V2/BasicStash_Expanded_Controller';
      const isExpandedCubeInstalled =
        findNode(fileContent, 'horadriccube_grid')?.fields?.cellCount?.x === 6;
      console.debug(
        isExpandedCubeInstalled
          ? 'Found Expanded Cube mod. Defaulting to expanded cube sprites. (Controller UI)'
          : 'Did not find Expanded Cube mod. Defaulting to normal cube sprites. (Controller UI)',
        findNode(fileContent, 'horadriccube_grid'),
      );
      const advancedStashTabBackground = isExpandedCubeInstalled
        ? 'Controller/Panel/Stash/V2/AdvancedStash_Expanded_Cube_Controller'
        : 'Controller/Panel/Stash/V2/AdvancedStash_Expanded_Controller';
      node.fields.backgroundFile = node.fields.backgroundFile.map(
        (file) =>
          ({
            'Controller/Panel/Stash/V2/StashPanelBGPersonal':
              basicStashTabBackground,
            'Controller/Panel/Stash/V2/StashPanelBGShared':
              basicStashTabBackground,
            'Controller/Panel/Stash/V2/AdditionalStash/AdvancedStash_Gems_Console':
              advancedStashTabBackground,
            'Controller/Panel/Stash/V2/AdditionalStash/AdvancedStash_Consumables_Console':
              advancedStashTabBackground,
            'Controller/Panel/Stash/V2/AdditionalStash/AdvancedStash_Runes_Console':
              advancedStashTabBackground,
          })[file] ?? file,
      );
    }

    if (name === 'background') {
      node.fields.filename =
        'Controller/Panel/Stash/V2/BasicStash_Expanded_Controller';
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
      node.fields.rect.x = node.fields.rect.x - 300;
      node.fields.rect.y = node.fields.rect.y + 10;
      // node.fields.tabSize = { x: 175, y: 120 };
      // node.fields.tabPadding = { x: 0, y: 0 };
      node.fields.tabLeftIndicatorPosition = { x: -42, y: -2 };
      node.fields.tabRightIndicatorPosition = { x: 1135 + 300, y: -2 };

      // hide gems and runes advanced stash tabs from the tab list
      // we keep the materials stash tab since it has the most
      // appropriate default localization
      const indices = [
        node.fields.textStrings.indexOf('@gems'),
        node.fields.textStrings.indexOf('@runes'),
      ].filter((index) => index !== -1);
      node.fields.tabCount -= indices.length;
      node.fields.inactiveFrames = node.fields.inactiveFrames.filter(
        (_, i) => !indices.includes(i),
      );
      node.fields.activeFrames = node.fields.activeFrames.filter(
        (_, i) => !indices.includes(i),
      );
      node.fields.disabledFrames = node.fields.disabledFrames.filter(
        (_, i) => !indices.includes(i),
      );
      node.fields.textStrings = node.fields.textStrings.filter(
        (_, i) => !indices.includes(i),
      );
    }

    if (name === 'StashNavigation' && node.fields && node.fields.rect) {
      node.fields.rect.x = -166;
      node.fields.rect.y = 1490;
    }

    return true;
  });
  D2RMM.writeJson(fileName, fileContent);
}

D2RMM.copyFile(
  'hd', // <mod folder>\hd
  'hd', // <diablo 2 folder>\mods\<modname>\<modname>.mpq\data\hd
  true, // overwrite any conflicts
);
