# ferrybox

[Deno](https://deno.land) IoT endpoint for FerryBoxes operated by Akvaplan-niva.

## Production

Production URL: https://ferrybox.deno.dev

## Continuous integration / deployment (CI/CD)

The production service is integrated with a CI/CD pipeline on GitHub.

Code merged into `main` creates a new production deployment, provided all tests
are green.

Notice: All git commits must be made to a feature branch and submitted via a
pull request before they can be merged into `main`.

## Features

- Accepts FerryBox messages as (ND)JSON via HTTP POST
- Validated messages are PUT put into cloud storage
- Hashed passwords are protected and verified by strong cryptographic function
  `scrypt` ([RFC](https://www.rfc-editor.org/rfc/rfc7914.html))
- Robust, scalable, low-latency operations via Deno
  [Deploy](https://deno.com/deploy)'s distributed edge computing network
- Built in [documentation](https://ferrybox.deno.deploy)

## Use

```js
import { createFerryBoxServer } from "./ferrybox.ts";

if (import.meta.main) {
  Deno.serve(createFerryBoxServer());
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

Notice: The endpoint pathname is used as cloud storage bucket/container

## Dev

```
deno task dev
```

Example curl POST

```sh
curl -vXPOST http://127.0.0.1:8000/ferrybox-dev1 --netrc-file .netrc -d'{}' -H "content-type: application/x-ndjson"
```
