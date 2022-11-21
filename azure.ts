import {
  buildConnectionString,
  config as azureProxyConfig,
} from "azure_blob_proxy/mod.ts";
import { AzureStorage } from "azure_storage_client/mod.ts";

import { parse } from "https://deno.land/x/xml/mod.ts";

import { BlobObject, ListObject } from "./types.ts";

export const storageFactory = () => {
  const options = azureProxyConfig();
  const { account, key, suffix } = options;
  const connectionString = buildConnectionString({ account, key, suffix });
  return new AzureStorage(connectionString);
};

export { azureProxyConfig };

const reverseName = (a: Record<string, string>, b: Record<string, string>) =>
  b?.name?.localeCompare(a?.name);

export const parseAzureListXML = (xml: string) => {
  const { enumerationResults } = parse(xml);

  const blobs: Array<BlobObject> = enumerationResults
    ? enumerationResults.Blobs.Blob
    : [];

  return blobs.map(({ Name, Properties }: BlobObject): ListObject => ({
    name: Name,
    created: new Date(Properties["Creation-Time"]).toJSON(),
    modified: new Date(Properties["Last-Modified"]).toJSON(),
  })).sort(reverseName);
};
