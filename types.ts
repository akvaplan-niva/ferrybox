//import { AzureProxyOptions } from "azure_blob_proxy/mod.ts";
export type FerryBoxCreateOptions = {
  endpoints: Set<string>;
  dataVersion: string;
  durationSpecifier: string;
  durationSpecifiers: Set<string>;
  //desc: Map<string, string>;
  handlers: Map<string, FetchHandler>;
  cloud: string;
  azure?: any;
};

// FetchHandler === Deno.ServeHandler
// type alias [Deno.ServeHandler](https://deno.land/api@v1.27.2?s=Deno.ServeHandler&unstable=)
// A handler for HTTP requests. Consumes a request and returns a response.
export type FetchHandler = (request: Request) => Response | Promise<Response>;
