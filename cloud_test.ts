import { assertEquals } from "testing/asserts.ts";
import { pathP1D } from "./cloud.ts";

Deno.test("Cloud path for P1D is v0/p1d/$year/$year-$month/$file", (): void => {
  const expected = "v0/p1d/2022/2022-11/ferrybox-name1_2022-11-11.ndjson";
  assertEquals(
    pathP1D({
      endpoint: "ferrybox-name1",
      isodate: "2022-11-11",
      format: "ndjson",
    }),
    expected,
  );
});
