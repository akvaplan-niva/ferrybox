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

const dataVersion = "v0";
const durationSpecifier = "p1d";
const durationSpecifiers = new Set<string>([durationSpecifier, "p1m"]);
const serviceVersion = "v0_prerelease";
export const ferryboxOptions: FerryBoxCreateOptions = {
  ...getEnvConfig(Deno.env),
  durationSpecifier,
  durationSpecifiers,
  dataVersion,
  serviceVersion,
};

const { cloud, endpoints } = ferryboxOptions;
if ("azure" === cloud) {
  const azure = azureProxyConfig();
  azure.containers = endpoints;
}
