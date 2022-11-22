import { assert } from "testing/asserts.ts";

export const isRFC3339Date = (time: string): boolean => {
  try {
    assert(time.length > 9);
    const [year, month, _day] = time.split("-");
    const day = _day.substring(0, 2);
    assert(+year > 1581 && year.length === 4);
    assert(+month > 0 && +month < 13);
    assert(+day > 0 && +day < 32);
    return true;
  } catch {
    return false;
  }
};
export const times = (t: Date = new Date()) => {
  const isodate = new Date(t).toJSON().split("T")[0];
  isRFC3339Date(isodate);
  const [month, day] = isodate.split("-").slice(1);
  const year = t.getUTCFullYear();
  return { year, month, day, isodate };
};
