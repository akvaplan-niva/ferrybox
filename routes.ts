export const messagesByISODateURL = (
  { base = "", endpoint = "", isodate = "" },
) => new URL(`/${endpoint}/${isodate}`, base);
export const endpointURL = ({ base = "", endpoint = "" }) =>
  new URL(`/${endpoint}`, base);
