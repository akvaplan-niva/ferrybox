# ferrybox

[Deno](https://deno.land) IoT endpoint for FerryBoxes operated by Akvaplan-niva

Production [URL](https://ferrybox.deno.deploy) on Deno Deploy.

## Features

- Accepts FerryBox messages as NDJSON via HTTP POST
- Validated messages are PUT put in cloud storage
- Hashed passwords are protected and verified by strong cryptographic function
  `scrypt` ([RFC](https://www.rfc-editor.org/rfc/rfc7914.html))
- Low-latency via Deno [Deploy](https://deno.com/deploy)'s global distributed
  edge computing network
- Built in [documentation](https://ferrybox.deno.deploy)

## Use

```js
import { createFerryBoxServer } from "./ferrybox.ts";
import { ferryboxOptions } from "./config.ts";
import { serve } from "http/mod.ts";

if (import.meta.main) {
  serve(createFerryBoxServer(ferryboxOptions));
}
```

## Configure

Configure using env variables

```bash
export ferrybox_endpoints='["ferrybox-dev1"]'
export ferrybox_cloud="azure"
export azure_account=""
export azure_key=""
export scrypt_basic_auth_users='[["username","scrypthash"]]'
```

## Dev

```
deno task dev
```

Example curl POST

```sh
curl -vXPOST http://127.0.0.1:8000/ferrybox-dev1 --netrc-file .netrc -d'{}' -H "content-type: application/x-ndjson"
```

Notice: The endpoint pathname is used as cloud storage bucket/container
