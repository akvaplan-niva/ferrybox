//import { AzureProxyOptions } from "azure_blob_proxy/mod.ts";
export type FerryBoxCreateOptions = {
  endpoints: Set<string>;
  dataVersion: string;
  durationSpecifier: string;
  durationSpecifiers: Set<string>;
  cloud: string;
  azure?: Record<string, string>;
};

// FetchHandler === Deno.ServeHandler
// type alias [Deno.ServeHandler](https://deno.land/api@v1.27.2?s=Deno.ServeHandler&unstable=)
// A handler for HTTP requests. Consumes a request and returns a response.
export type FetchHandler = (request: Request) => Response | Promise<Response>;

export type ListObject = {
  name: string;
  created: string;
  modified: string;
};
export type BlobObject = {
  Name: string;
  Properties: Record<string, string>;
};

export type EnumerationResultsObject = {
  Blobs: Record<string, Array<BlobObject>>;
};
