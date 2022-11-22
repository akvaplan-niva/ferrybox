import { isRFC3339Date } from "./time.ts";
import { ferryboxOptions } from "./config.ts";

// Relative cloud path for 1-day files
// Path for daily (p1d) file in dataVersion 0 (v0) for "ferrybox-name1" on "2022-11-11Z":
// ferrybox-name1/v0/p1d/2022/2022-11/ferrybox-name1_2022-11-11.ndjson
export const pathP1D = ({
  endpoint = "",
  isodate = new Date().toJSON().split("T")[0],
  format = "ndjson",
}) => {
  isRFC3339Date(isodate);
  const { dataVersion, durationSpecifier } = ferryboxOptions;
  const [year, month] = isodate.split("-").slice(0, 2);
  const isomonth = `${year}-${month}`;
  return `${dataVersion}/${durationSpecifier}/${year}/${isomonth}/${endpoint}_${isodate}.${format}`;
};
