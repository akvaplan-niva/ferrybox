//import { putGroupedNDJSON } from "./putGroupedNDJSON";
import { storageFactory } from "./azure.ts";
import { endpointPattern, isodatePattern } from "./config.ts";
import { pathP1D } from "./cloud.ts";
import { welcome } from "./html.js";
import { get as getAzure } from "azure_blob_proxy/mod.ts";

const list = async (request: Request): Promise<Response> => {
  const match = endpointPattern.exec(request.url);
  if (match) {
    const storage = storageFactory();
    const { endpoint, dataVersion } = match.pathname.groups;
    const r = await storage.container(endpoint).list(dataVersion);
    const { body } = r;
    const headers = new Headers([...r.headers, [
      "content-type",
      "application/xml",
    ]]);
    return new Response(body, { headers });
  }
  return welcome(request);
};

export const get = async (request: Request): Promise<Response> => {
  if (endpointPattern.test(request.url)) {
    return list(request);
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
    const headers = new Headers([...r.headers, [
      "content-type",
      "text/plain",
    ]]);
    if (r.ok) {
      return new Response(body, { headers });
    }
    return r;
  }
  return welcome(request);
};
