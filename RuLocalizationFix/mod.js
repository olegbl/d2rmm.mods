const localChanges = [
  'bnet', 'commands', 'item-modifiers', 'item-nameaffixes', 'item-names', 'item-runes', 'levels', 'monsters', 'quests', 'skills', 'ui'
]

// TODO it's hack with copy files to mod folder should be optimized in D2RMM copyFile API
// copy the file so that it exists
D2RMM.copyFile(
  'local', // <mod folder>\local
  'local', // <diablo 2 folder>\mods\D2RMM\D2RMM.mpq\data\local
  true // overwrite any conflicts
);
// overwrite it so D2RMM knows it exists in mod output
localChanges.forEach((local) => {
  D2RMM.writeJson(`local\\lng\\strings\\diffs\\${local}.diff.json`, {});
});
// copy the file again to update its contents
D2RMM.copyFile(
  'local', // <mod folder>\local
  'local', // <diablo 2 folder>\mods\D2RMM\D2RMM.mpq\data\local
  true // overwrite any conflicts
);

const updateLocal = (localData, diffData) => {
  diffData.forEach((itemDiff) => {
    const itemtype = itemDiff.Key;
  
    let item = localData.filter(x => { return x.Key === itemtype })[0];
  
    if (item == undefined)
      D2RMM.error(`Item with key ${itemtype} not found`);
  
    if (itemDiff.Update && item) {
      item[itemDiff.Locale] = itemDiff.Update;
    } else {
      item[itemDiff.Locale] = itemDiff.Prefix || '' + item[itemDiff.Locale] + itemDiff.Suffix || '';
    }
  });
}

localChanges.forEach((local) => {
  const localDataFileName = `local\\lng\\strings\\${local}.json`;
  const localData = D2RMM.readJson(localDataFileName);
  const diffData = D2RMM.readJson(`local\\lng\\strings\\diffs\\${local}.diff.json`);
  updateLocal(localData, diffData);
  D2RMM.writeJson(localDataFileName, localData);
});
