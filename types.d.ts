// this utility file assumes that /d2rmm.mods/ lives alongside /d2rmm/

import { ConsoleAPI } from '../src/renderer/ConsoleAPITypes.d';
import { ModAPI } from '../src/renderer/ModAPITypes.d';
import { ModConfigValue } from '../src/renderer/ModConfigTypes.d';

declare global {
  const config: ModConfigValue;
  const console: ConsoleAPI;
  const D2RMM: ModAPI;
}
