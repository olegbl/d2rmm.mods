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

const profileHDFilename = 'global\\ui\\layouts\\_profilehd.json';
const profileHD = D2RMM.readJson(profileHDFilename);
D2RMM.writeJson(profileHDFilename, profileHD);

const profileLVFilename = 'global\\ui\\layouts\\_profilelv.json';
const profileLV = D2RMM.readJson(profileLVFilename);
D2RMM.writeJson(profileLVFilename, profileLV);

const horadricCubeLayoutHDFilename =
  'global\\ui\\layouts\\horadriccubelayouthd.json';
const horadricCubeHDLayout = D2RMM.readJson(horadricCubeLayoutHDFilename);
horadricCubeHDLayout.children.forEach((child) => {
  if (child.name === 'grid') {
    child.fields.cellCount.x = 6;
    child.fields.cellCount.y = 4;
    child.fields.rect.x = child.fields.rect.x - 144;
  }
  if (child.name === 'background') {
    child.fields.filename = 'PANEL\\Horadric_Cube\\HoradricCube_BG_Expanded';
  }
});
D2RMM.writeJson(horadricCubeLayoutHDFilename, horadricCubeHDLayout);

const controllerHoradricCubeHDLayoutFilename =
  'global\\ui\\layouts\\controller\\horadriccubelayouthd.json';
const controllerHoradricCubeHDLayout = D2RMM.readJson(
  controllerHoradricCubeHDLayoutFilename,
);
controllerHoradricCubeHDLayout.children.forEach((child) => {
  if (child.name === 'grid') {
    child.fields.rect.x = child.fields.rect.x - 142;
  }
  if (child.name === 'background') {
    child.fields.filename =
      'Controller/Panel/HoradricCube/V2/HoradricCubeBG_Expanded';
  }
});
D2RMM.writeJson(
  controllerHoradricCubeHDLayoutFilename,
  controllerHoradricCubeHDLayout,
);

D2RMM.copyFile(
  'hd', // <mod folder>\hd
  'hd', // <diablo 2 folder>\mods\<modname>\<modname>.mpq\data\hd
  true, // overwrite any conflicts
);
