import {
  buildConnectionString,
  config as azureProxyConfig,
} from "azure_blob_proxy/mod.ts";
import { AzureStorage } from "azure_storage_client/mod.ts";

export const storageFactory = () => {
  const options = azureProxyConfig();
  const { account, key, suffix } = options;
  const connectionString = buildConnectionString({ account, key, suffix });
  return new AzureStorage(connectionString);
};

export { azureProxyConfig };
