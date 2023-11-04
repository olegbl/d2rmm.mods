// See https://gomule.sourceforge.io/ for GoMule

D2RMM.copyFile(
  'GoMule', // <mod folder>\GoMule
  'GoMule', // <diablo 2 folder>\mods\<modname>\<modname>.mpq\data\GoMule
  true // overwrite any conflicts
);

function exportResourceForGoMule(filepath) {
  const filename = filepath.substring(filepath.lastIndexOf('\\') + 1, filepath.length);
  const data = D2RMM.readTxt(filepath);
  D2RMM.writeTxt(`GoMule\\d2111\\${filename}`, data);
}

exportResourceForGoMule('global\\excel\\armor.txt');
exportResourceForGoMule('global\\excel\\automagic.txt');
exportResourceForGoMule('global\\excel\\charstats.txt');
exportResourceForGoMule('global\\excel\\gems.txt');
exportResourceForGoMule('global\\excel\\hireling.txt');
exportResourceForGoMule('global\\excel\\itemratio.txt');
exportResourceForGoMule('global\\excel\\itemstatcost.txt');
exportResourceForGoMule('global\\excel\\itemtypes.txt');
exportResourceForGoMule('global\\excel\\levels.txt');
exportResourceForGoMule('global\\excel\\magicprefix.txt');
exportResourceForGoMule('global\\excel\\magicsuffix.txt');
exportResourceForGoMule('global\\excel\\misc.txt');
exportResourceForGoMule('global\\excel\\monstats.txt');
exportResourceForGoMule('global\\excel\\properties.txt');
exportResourceForGoMule('global\\excel\\rareprefix.txt');
exportResourceForGoMule('global\\excel\\raresuffix.txt');
exportResourceForGoMule('global\\excel\\runes.txt');
exportResourceForGoMule('global\\excel\\setitems.txt');
exportResourceForGoMule('global\\excel\\sets.txt');
exportResourceForGoMule('global\\excel\\skilldesc.txt');
exportResourceForGoMule('global\\excel\\skills.txt');
exportResourceForGoMule('global\\excel\\superuniques.txt');
exportResourceForGoMule('global\\excel\\treasureclassex.txt');
exportResourceForGoMule('global\\excel\\uniqueitems.txt');
exportResourceForGoMule('global\\excel\\weapons.txt');
