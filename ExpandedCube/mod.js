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

['global\\excel\\inventory.txt', 'global\\excel\\base\\inventory.txt'].forEach(
  (fileName) => {
    const fileContent = D2RMM.readTsv(fileName);
    if (!fileContent) return;
    fileContent.rows.forEach((row) => {
      if (
        row.class === 'Transmogrify Box Page 1' ||
        row.class === 'Transmogrify Box2'
      ) {
        row.gridX = 6;
      }
    });
    D2RMM.writeTsv(fileName, fileContent);
  },
);

{
  // Classic Graphics
  const fileName = 'global\\ui\\layouts\\horadriccubelayouthd.json';
  const fileContent = D2RMM.readJson(fileName);
  fileContent.children.forEach((child) => {
    if (child.name === 'grid') {
      child.fields.cellCount.x = 6;
      child.fields.cellCount.y = 4;
      child.fields.rect.x = child.fields.rect.x - 144;
    }
    if (child.name === 'background') {
      child.fields.filename = 'PANEL\\Horadric_Cube\\HoradricCube_BG_Expanded';
    }
  });
  D2RMM.writeJson(fileName, fileContent);
}

{
  // Resurrected Graphics
  const fileName = 'global\\ui\\layouts\\controller\\horadriccubelayouthd.json';
  const fileContent = D2RMM.readJson(fileName);
  fileContent.children.forEach((child) => {
    if (child.name === 'grid') {
      child.fields.rect.x = child.fields.rect.x - 142;
    }
    if (child.name === 'background') {
      child.fields.filename =
        'Controller/Panel/HoradricCube/V2/HoradricCubeBG_Expanded';
    }
  });
  D2RMM.writeJson(fileName, fileContent);
}

{
  // RotW Advanced Tabs
  const fileName = 'global\\ui\\layouts\\bankexpansionlayouthd.json';
  const fileContent = D2RMM.readJson(fileName);
  const grid = findNode(fileContent, 'horadriccube_grid');
  // update cell count
  if (grid?.fields?.cellCount) {
    grid.fields.cellCount.x = 6;
  }
  // sprites don't need an explicit change - we just package new versions in hd folder
  // detect Expanded Stash mod and switch its sprites
  if (Array.isArray(fileContent?.fields?.backgroundFile)) {
    fileContent.fields.backgroundFile = fileContent.fields.backgroundFile.map(
      (file) =>
        file === 'PANEL\\Stash\\AdvancedStash_Expanded'
          ? 'PANEL\\Stash\\AdvancedStash_Expanded_Cube'
          : file,
    );
    if (
      fileContent.fields.backgroundFile.some(
        (file) => file === 'PANEL\\Stash\\AdvancedStash_Expanded_Cube',
      )
    ) {
      console.debug(
        'Detected Expanded Stash mod. Updating sprites to expanded cube sprites.',
      );
    }
  }
  D2RMM.writeJson(fileName, fileContent);
}

D2RMM.copyFile(
  'hd', // <mod folder>\hd
  'hd', // <diablo 2 folder>\mods\<modname>\<modname>.mpq\data\hd
  true, // overwrite any conflicts
);
