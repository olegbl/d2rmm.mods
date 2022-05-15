D2RMM.copyFile(
  'hd', // <mod folder>\hd
  'hd', // <diablo 2 folder>\mods\<modname>\<modname>.mpq\data\hd
  true // overwrite any conflicts
);

if (config.zhtw) {
  D2RMM.copyFile(
    'hd', // <mod folder>\hd
    '..\\locales\\zhtw\\data\\hd', // <diablo 2 folder>\mods\<modname>\<modname>.mpq\data\hd
    true // overwrite any conflicts
  );
}

if (config.jajp) {
  D2RMM.copyFile(
    'hd', // <mod folder>\hd
    '..\\locales\\jajp\\data\\hd', // <diablo 2 folder>\mods\<modname>\<modname>.mpq\data\hd
    true // overwrite any conflicts
  );
}
