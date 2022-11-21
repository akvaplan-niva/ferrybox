import { FerryBoxCreateOptions } from "./types.ts";
import { azureProxyConfig } from "./azure.ts";

const getEnvConfig = (env: Deno.Env) => {
  return {
    endpoints: new Set<string>(
      JSON.parse(env.get("ferrybox_endpoints") ?? "[]"),
    ),
    cloud: env.get("ferrybox_cloud") ?? "azure",
  };
};

// const desc = new Map<string, string>([
//   [
//     "ferrybox-akvapltest",
//     `Test data from FerryBox in field boat [Louise](https://www.akvaplan.niva.no/ms-louise/)`,
//   ],
// ]);

const dataVersion = "v0";
const durationSpecifier = "p1d";
export const ferryboxOptions: FerryBoxCreateOptions = {
  ...getEnvConfig(Deno.env),
  durationSpecifier,
  durationSpecifiers: new Set<string>([durationSpecifier, "p1m"]),
  dataVersion,
  //desc,
};

const { cloud, endpoints } = ferryboxOptions;
if ("azure" === cloud) {
  const azure = azureProxyConfig();
  azure.containers = endpoints;
}

export const endpointPattern = new URLPattern({
  pathname: "/:endpoint([a-z][\\w-]+)",
});
export const isodatePattern = new URLPattern({
  pathname: "/:endpoint([a-z][\\w-]+)/:year-:month-:day",
});
