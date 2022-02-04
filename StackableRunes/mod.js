function isRune(itemtype) {
  return itemtype != null && itemtype.match(/^r[0-9][0-9]$/) != null;
}

function converRuneItemTypeToRuneStackItemType(itemtype) {
  if (itemtype != null && isRune(itemtype)) {
    return itemtype.replace('r', 's');
  }
  return itemtype;
}

const runeFilesnames = [];

const itemsFilename = 'hd\\items\\items.json';
const items = D2RMM.readJson(itemsFilename);
const newItems = [...items];
for (const index in items) {
  const item = items[index];
  for (const itemtype in item) {
    const asset = item[itemtype].asset;
    if (asset.startsWith('rune/') && !asset.endsWith('_stack')) {
      const itemtypeStack = converRuneItemTypeToRuneStackItemType(itemtype);
      newItems.push({ [itemtypeStack]: { asset: `${asset}_stack` } });
      runeFilesnames.push(asset.replace('rune/', ''));
    }
  }
}
D2RMM.writeJson(itemsFilename, newItems);

const runeDirFilename = 'hd\\items\\misc\\rune\\';
for (const index in runeFilesnames) {
  const runeFilename = `${runeDirFilename + runeFilesnames[index]}.json`;
  const runeSingleFilename = `${
    runeDirFilename + runeFilesnames[index]
  }_stack.json`;
  const rune = D2RMM.readJson(runeFilename);
  D2RMM.writeJson(runeSingleFilename, rune);
}

const itemtypesFilename = 'global\\excel\\itemtypes.txt';
const itemtypes = D2RMM.readTsv(itemtypesFilename);
itemtypes.rows.forEach((itemtype) => {
  if (itemtype.Code === 'rune') {
    itemtypes.rows.push({
      ...itemtype,
      ItemType: `${itemtype.ItemType} Stack`,
      Code: 'runs',
      Equiv1: 'misc',
      AutoStack: 1,
    });
  }
});
D2RMM.writeTsv(itemtypesFilename, itemtypes);

const treasureclassexFilename = 'global\\excel\\treasureclassex.txt';
const treasureclassex = D2RMM.readTsv(treasureclassexFilename);
treasureclassex.rows.forEach((treasureclass) => {
  treasureclass.Item1 = converRuneItemTypeToRuneStackItemType(
    treasureclass.Item1
  );
  treasureclass.Item2 = converRuneItemTypeToRuneStackItemType(
    treasureclass.Item2
  );
});
D2RMM.writeTsv(treasureclassexFilename, treasureclassex);

const miscFilename = 'global\\excel\\misc.txt';
const misc = D2RMM.readTsv(miscFilename);
misc.rows.forEach((item) => {
  if (item.type === 'rune') {
    misc.rows.push({
      ...item,
      name: `${item.name} Stack`,
      compactsave: 0,
      type: 'runs',
      code: converRuneItemTypeToRuneStackItemType(item.code),
      stackable: 1,
      minstack: 1,
      maxstack: 500,
      spawnstack: 1,
    });
    item.spawnable = 0;
  }
});
D2RMM.writeTsv(miscFilename, misc);

const cubemainFilename = 'global\\excel\\cubemain.txt';
const cubemain = D2RMM.readTsv(cubemainFilename);
for (let i = 1; i <= 33; i += 1) {
  const runetype = `r${i < 10 ? `0${i}` : i}`;
  const stacktype = converRuneItemTypeToRuneStackItemType(runetype);
  // convert from rune to stack
  cubemain.rows.push({
    description: `${runetype} -> ${stacktype}`,
    enabled: 1,
    version: 100,
    numinputs: 1,
    'input 1': runetype,
    output: stacktype,
    '*eol': 0,
  });
  // convert from stack to rune
  cubemain.rows.push({
    description: `${stacktype} -> ${runetype}`,
    enabled: 1,
    version: 100,
    op: 18, // skip recipe if item's Stat.Accr(param) != value
    param: 70, // quantity (itemstatcost.txt)
    value: 1, // only execute rule if quantity == 1
    numinputs: 1,
    'input 1': stacktype,
    output: runetype,
    '*eol': 0,
  });
}
for (let i = 2; i <= 500; i += 1) {
  cubemain.rows.push({
    description: `Stack of ${i} -> Stack of ${i - 1} and Stack of 1`,
    enabled: 1,
    version: 0,
    op: 18, // skip recipe if item's Stat.Accr(param) != value
    param: 70, // quantity (itemstatcost.txt)
    value: i, // only execute rule if quantity == i
    numinputs: 1,
    'input 1': 'misc',
    output: `"usetype,qty=${i - 1}"`,
    'output b': `"usetype,qty=1"`,
    '*eol': 0,
  });
}
D2RMM.writeTsv(cubemainFilename, cubemain);

D2RMM.copyFile(
  'hd', // <mod folder>\hd
  'hd', // <diablo 2 folder>\mods\<modname>\<modname>.mpq\data\hd
  true // overwrite any conflicts
);
