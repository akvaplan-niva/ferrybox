import { get } from "./get.ts";
import { post } from "./post.ts";

import { FerryBoxCreateOptions, FetchHandler } from "./types.ts";

import { azureProxyConfig } from "./azure.ts";

const getEnvConfig = (env: Deno.Env) => {
  return {
    endpoints: new Set<string>(
      JSON.parse(env.get("ferrybox_endpoints") ?? "[]"),
    ),
    cloud: env.get("ferrybox_cloud") ?? "azure",
  };
};

const handlers = new Map<string, FetchHandler>([
  ["POST", post],
  ["GET", get],
]);

// const desc = new Map<string, string>([
//   [
//     "ferrybox-akvapltest",
//     `Test data from FerryBox in field boat [Louise](https://www.akvaplan.niva.no/ms-louise/)`,
//   ],
// ]);

const dataVersion = "v0";
const durationSpecifier = "p1d";
export const ferryboxOptions: FerryBoxCreateOptions = {
  durationSpecifier,
  durationSpecifiers: new Set<string>([durationSpecifier, "p1m"]),
  dataVersion,
  handlers,
  //desc,
  ...getEnvConfig(Deno.env),
};

const { cloud, endpoints } = ferryboxOptions;
if ("azure" === cloud) {
  const azure = azureProxyConfig();
  azure.containers = endpoints;
}

export const groupby1day = (msg: Record<string, unknown>) => {
  const { time } = msg;
  const t = time ? new Date(time) : new Date();
  const { isodate } = times(t);
  return isodate;
};

export const times = (t: Date = new Date()) => {
  const isodate = new Date(t).toJSON().split("T")[0];
  const [month, day] = isodate.split("-").slice(1);
  const year = t.getUTCFullYear();
  return { year, month, day, isodate };
};

export const pathP1D = (
  endpoint: string,
  isodate: string,
  format = "ndjson",
) => {
  const { dataVersion, durationSpecifier } = ferryboxOptions;
  return `${dataVersion}/${durationSpecifier}/${
    isodate.split("-").join("/")
  }/${endpoint}_${isodate}_${dataVersion}.${format}`;
};
export const endpointPattern = new URLPattern({
  pathname: "/:endpoint([a-z][\\w-]+)",
});
export const isodatePattern = new URLPattern({
  pathname: "/:endpoint([a-z][\\w-]+)/:year-:month-:day",
});
