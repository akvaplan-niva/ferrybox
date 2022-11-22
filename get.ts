import { endpointPattern, isodatePattern } from "./routes.ts";

import { messagesByISODateURL } from "./routes.ts";
import { notImplemented } from "./error_responses.ts";

import { build, welcome } from "./html.js";
import { cors, html, ndjson } from "./headers.ts";

import { pathP1D } from "./cloud.ts";
import { ListObject } from "./types.ts";

import { parseAzureListXML, storageFactory } from "./azure.ts";
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

    const wantsOrAcceptsHTML = /(ht|x)ml/i.test(
      request.headers.get("accept") ?? "",
    );
    if (wantsOrAcceptsHTML) {
      const markup = urls.map((url) => `<a href="${url}">${url}</a>`).join("");
      return new Response(build({ markup, base, lang }), {
        headers: html,
      });
    }
    return notImplemented();
  }
  return welcome(request);
};

export const getByISODate = async (request: Request): Promise<Response> => {
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

    const response = await getAzure({ request, storage, container, path });

    if (!response.ok) {
      return response;
    }
    const headers: HeadersInit = { ...response.headers, ...cors, ...ndjson };
    return new Response(response.body, { headers });
  }
  return welcome(request);
};
