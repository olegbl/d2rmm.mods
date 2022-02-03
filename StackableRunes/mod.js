function isRune(itemtype) {
  return itemtype != null && itemtype.match(/^r[0-3][0-9]$/) != null;
}

function converRuneItemTypeToRuneStackItemType(itemtype) {
  if (itemtype != null && isRune(itemtype)) {
    return itemtype.replace("r", "s");
  }
  return itemtype;
}

const itemsFilename = "hd\\items\\items.json";
const items = await D2RMM.readJson(itemsFilename);
const newItems = [...items];
for (let index in items) {
  const item = items[index];
  for (let id in item) {
    // only match runes (r01 - r33)
    if (isRune(id)) {
      const value = item[id];
      const newID = id.replace("r", "s"); // (s01 - s33)
      newItems.push({ [newID]: { asset: value.asset + "_stack" } });
    }
  }
}
await D2RMM.writeJson(itemsFilename, newItems);

const runesFilename = "\\hd\\items\\misc\\rune";
const runes = await D2RMM.readDirectory(runesFilename, {
  filesOnly: true,
});
for (let index in runes) {
  const runeFilename = runesFilename + "\\" + runes[index];
  const runeSingleFilename =
    runesFilename + "\\" + runes[index].replace(".json", "_stack.json");
  const rune = await D2RMM.readJson(runeFilename);
  await D2RMM.writeJson(runeSingleFilename, rune);
}

const itemtypesFilename = "global\\excel\\itemtypes.txt";
const itemtypes = await D2RMM.readTsv(itemtypesFilename);
itemtypes.rows.forEach((itemtype) => {
  if (itemtype.Code === "rune") {
    itemtypes.rows.push({
      ...itemtype,
      ItemType: itemtype.ItemType + " Stack",
      Code: "runs",
      Equiv1: "misc",
      AutoStack: 1,
    });
  }
});
await D2RMM.writeTsv(itemtypesFilename, itemtypes);

const treasureclassexFilename = "global\\excel\\treasureclassex.txt";
const treasureclassex = await D2RMM.readTsv(treasureclassexFilename);
treasureclassex.rows.forEach((treasureclass) => {
  treasureclass.Item1 = converRuneItemTypeToRuneStackItemType(
    treasureclass.Item1
  );
  treasureclass.Item2 = converRuneItemTypeToRuneStackItemType(
    treasureclass.Item2
  );
});
await D2RMM.writeTsv(treasureclassexFilename, treasureclassex);

const miscFilename = "global\\excel\\misc.txt";
const misc = await D2RMM.readTsv(miscFilename);
misc.rows.forEach((item) => {
  if (isRune(item.code)) {
    misc.rows.push({
      ...item,
      name: item.name + " Stack",
      compactsave: 0,
      type: "runs",
      code: converRuneItemTypeToRuneStackItemType(item.code),
      stackable: 1,
      minstack: 1,
      maxstack: 500,
      spawnstack: 1,
    });
    item.spawnable = 0;
  }
});
await D2RMM.writeTsv(miscFilename, misc);

const cubemainFilename = "global\\excel\\cubemain.txt";
const cubemain = await D2RMM.readTsv(cubemainFilename);
for (let i = 1; i <= 33; i++) {
  const runetype = "r" + (i < 10 ? "0" + i : i);
  const stacktype = converRuneItemTypeToRuneStackItemType(runetype);
  // convert from rune to stack
  cubemain.rows.push({
    description: runetype + " -> " + stacktype,
    enabled: 1,
    version: 100,
    numinputs: 1,
    "input 1": runetype,
    output: stacktype,
    "*eol": 0,
  });
  // convert from stack to rune
  cubemain.rows.push({
    description: stacktype + " -> " + runetype,
    enabled: 1,
    version: 100,
    op: 18, // skip recipe if item's Stat.Accr(param) != value
    param: 70, // quantity (itemstatcost.txt)
    value: 1, // only execute rule if quantity == 1
    numinputs: 1,
    "input 1": stacktype,
    output: runetype,
    "*eol": 0,
  });
}
for (let i = 2; i <= 500; i++) {
  cubemain.rows.push({
    description:
      "Stack of " + i + " -> Stack of " + (i - 1) + " and Stack of 1",
    enabled: 1,
    version: 0,
    op: 18, // skip recipe if item's Stat.Accr(param) != value
    param: 70, // quantity (itemstatcost.txt)
    value: i, // only execute rule if quantity == i
    numinputs: 1,
    "input 1": "misc",
    output: `"usetype,qty=${i - 1}"`,
    "output b": `"usetype,qty=1"`,
    "*eol": 0,
  });
}
await D2RMM.writeTsv(cubemainFilename, cubemain);

await D2RMM.copyFile(
  "hd", // <mod folder>\hd
  "hd", // <diablo 2 folder>\mods\<modname>\<modname>.mpq\data\hd
  true // overwrite any conflicts
);
