# ferrybox

[Deno](https://deno.land) IoT endpoint for FerryBoxes operated by Akvaplan-niva

## Features

- Accepts FerryBox messages as NDJSON via HTTP POST
- Validated messages are PUT in cloud storage
- Hashed passwords are protected and verified by strong cryptographic function
  `scrypt` ([RFC](https://www.rfc-editor.org/rfc/rfc7914.html))
- Low-latency via Deno [Deploy](https://deno.com/deploy)'s global distributed
  edge computing network
- Built in [documentation](…)

## Use

```js
import { createFerryBoxServer } from "./ferrybox.ts";
import { ferryboxOptions } from "./config.ts";
import { serve } from "http/mod.ts";

if (import.meta.main) {
  serve(createFerryBoxServer(ferryboxOptions));
}
```
