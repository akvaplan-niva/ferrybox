import { AzureProxyOptions } from "azure_blob_proxy/mod.ts";
export type FerryBoxCreateOptions = {
  endpoints: Set<string>;
  dataVersion: string;
  durationSpecifier: string;
  durationSpecifiers: Set<string>;
  //desc: Map<string, string>;
  handlers: Map<string, FetchHandler>;
  cloud: string;
  azure?: AzureProxyOptions;
};

export type FetchHandler = (request: Request) => Response | Promise<Response>;
