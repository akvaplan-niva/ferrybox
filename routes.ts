export const messagesByISODateURL = (
  { base = "", endpoint = "", isodate = "" },
) => new URL(`/${endpoint}/${isodate}`, base);
export const endpointURL = ({ base = "", endpoint = "" }) =>
  new URL(`/${endpoint}`, base);
export const endpointPattern = new URLPattern({
  pathname: "/:endpoint([a-z][\\w-]+)",
});
export const isodatePattern = new URLPattern({
  pathname: "/:endpoint([a-z][\\w-]+)/:year-:month-:day",
});
