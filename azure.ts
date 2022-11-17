import {
  buildConnectionString,
  config as azureProxyConfig,
} from "azure_blob_proxy/mod.ts";
import { AzureStorage } from "azure_storage_client/mod.ts";

import { parse } from "https://deno.land/x/xml/mod.ts";

export const storageFactory = () => {
  const options = azureProxyConfig();
  const { account, key, suffix } = options;
  const connectionString = buildConnectionString({ account, key, suffix });
  return new AzureStorage(connectionString);
};

export { azureProxyConfig };

const reverseName = (a: any, b: any) => b?.name?.localeCompare(a?.name);

export const parseAzureListXML = (xml: string) => {
  const { EnumerationResults: { Blobs: { Blob } } } = parse(xml);

  return Blob.map(({ Name, Properties }) => ({
    name: Name,
    created: new Date(Properties["Creation-Time"]).toJSON(),
    modified: new Date(Properties["Last-Modified"]).toJSON(),
  })).sort(reverseName);
};
