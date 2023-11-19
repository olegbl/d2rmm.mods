import { ConsoleAPI } from '../src/renderer/ConsoleAPITypes.d';
import { ModAPI } from '../src/renderer/ModAPITypes.d';
import { ModConfigValue } from '../src/renderer/ModConfigTypes.d';

declare global {
  const config: ModConfigValue;
  // @ts-ignore[2649]: overriding global console
  const console: ConsoleAPI;
  const D2RMM: ModAPI;
}

export {};
