export * from "./config.ts";
export * from "./ferrybox.ts";

import { createFerryBoxServer } from "./ferrybox.ts";
import { ferryboxOptions } from "./config.ts";

import { serve } from "http/mod.ts";

if (import.meta.main) {
  serve(createFerryBoxServer(ferryboxOptions));
}
