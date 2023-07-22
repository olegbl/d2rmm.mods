// touching the files makes sure that the mod can
// be uninstalled properly when using -direct mode
D2RMM.readTxt('hd\\global\\video\\blizzardlogos.webm');
D2RMM.readTxt('hd\\global\\video\\logoanim.webm');

D2RMM.copyFile(
  'hd', // <mod folder>\hd
  'hd', // <diablo 2 folder>\mods\<modname>\<modname>.mpq\data\hd
  true // overwrite any conflicts
);
