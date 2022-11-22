import { ferryboxOptions } from "./config.ts";
import { endpointPattern } from "./routes.ts";
import { pathP1D } from "./cloud.ts";
import { groupby1day } from "./grouping.ts";
import { ndjsonGenerator } from "./ndjson.ts";

// @todo fetchers (GET,PUT) via "cloud" options
import { storageFactory } from "./azure.ts";
import { get as getAzure, put as putAzure } from "azure_blob_proxy/mod.ts";

export const post = async (request: Request): Promise<Response> => {
  const { endpoints } = ferryboxOptions;

  const match = endpointPattern.exec(request.url);
  if (match) {
    const { endpoint } = match.pathname.groups;
    if (endpoints.has(endpoint)) {
      const map = new Map<string, Array<Record<string, unknown>>>([]);
      for await (const msg of ndjsonGenerator(request)) {
        const k = groupby1day(msg);
        const v = map.has(k) ? [...(map.get(k) ?? []), msg] : [msg];

        map.set(k, v);
      }
      //const sha256 = await crypto.subtle.digest("SHA-256", new TextEncoder().encode());
      // const statuses = new Set<number>();
      // const ok = new Map<string, string[]>();
      // const error = new Map<string, string[]>();

      const storage = storageFactory();
      const container = endpoint;
      const format = "ndjson";

      for (const [isodate, messages] of map) {
        const path = pathP1D({ endpoint, isodate, format });

        let existing = "";
        const existingResponse = await getAzure({
          request,
          storage,
          container,
          path,
        });

        if (existingResponse.ok) {
          existing = await existingResponse.text();
        }
        const ndjson = messages.map((m) => JSON.stringify(m)).join("\n") + "\n";
        const body = new TextEncoder().encode(existing + ndjson);

        const { headers, url, method } = request;

        return putAzure({
          request: new Request(url, { body, method, headers }),
          storage,
          container,
          path,
        });

        // @todo POST response body
        //       const { status, statusText, headers } = response;
        //       const location = headers.get("location");
        //       statuses.add(status);
        //       if (response.ok) {
        //         ok.set(path, [location, status]);
        //       } else {
        //         error.set(path, [location, status, statusText]);
        //       }
        //     }
        //   }
        //   const status = (statuses.size === 1) ? [...statuses][0] : 500;

        //   const ndjsonheaders = { "content-type": "application/x-ndjson" };

        //   if (status < 300) {
        //     //["v0/p1d/1970/1970-01/louise_ferrybox_test_1970-01-01.ndjson",[null,404,"Not Found"]]
        //     return new Response(
        //       [...ok.values()].map(JSON.stringify).join("\n") + "\n",
        //       {
        //         status,
        //         headers: ndjsonheaders,
        //       },
        //     );
        //   }
        //   return new Response([...ok, ...error].map(JSON.stringify).join("\n") + "\n", {
        //     status: 500,
        //     headers: ndjsonheaders,
        //   });
        // };
      }
    }
  }
  return new Response("404", { status: 404 });
};
