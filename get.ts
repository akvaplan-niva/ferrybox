import { endpointPattern, isodatePattern } from "./config.ts";
import { parseAzureListXML, storageFactory } from "./azure.ts";
import { pathP1D } from "./cloud.ts";
import { messagesByISODateURL } from "./routes.ts";
import { build, welcome } from "./html.js";
import { cors } from "./headers.ts";
import { ListObject } from "./types.ts";

import { get as getAzure } from "azure_blob_proxy/mod.ts";

const extractISODate = (s: string) =>
  /([0-9]{4}\-[0-9]{2}\-[0-9]{2})/.exec(s)?.at(1);

const index = async (request: Request): Promise<Response> => {
  const match = endpointPattern.exec(request.url);
  if (match) {
    const storage = storageFactory();
    const { endpoint, dataVersion } = match.pathname.groups;

    const r = await storage.container(endpoint).list(dataVersion);
    if (!r.ok) {
      return r;
    }
    const list = parseAzureListXML(await r.text());

    const base = request.url;
    const lang = "en";

    const urls = list.map(({ name }: ListObject) =>
      messagesByISODateURL({
        base,
        endpoint,
        isodate: extractISODate(name),
      })
    );
    const markup = urls.map((url) => `<a href="${url}">${url}</a>`).join("");
    return new Response(build({ markup, base, lang }), {
      headers: { "content-type": "text/html" },
    });
  }
  return welcome(request);
};

export const get = async (request: Request): Promise<Response> => {
  if (endpointPattern.test(request.url)) {
    return index(request);
  }
  const match = isodatePattern.exec(request.url);

  if (match) {
    const { year, month, day, endpoint } = match.pathname.groups;
    const isodate = `${year}-${month}-${day}`;
    const storage = storageFactory();
    const format = "ndjson";
    const path = pathP1D({ endpoint, isodate, format });
    const container = endpoint;

    const r = await getAzure({ request, storage, container, path });
    const { body } = r;
    const headers = new Headers({
      ...r.headers,
      ...cors,
      "content-type": "text/plain",
    });
    if (r.ok) {
      return new Response(body, { headers });
    }
    return r;
  }
  return welcome(request);
};
