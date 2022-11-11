import { times } from "./time.ts";

// deno-lint-ignore no-explicit-any
export const groupby1day = (msg: Record<string, any>) => {
  const { time } = msg;
  if (time) {
    const { isodate } = times(new Date(time));
    return isodate;
  }
  throw "Cannot group, message has no time member";
};
