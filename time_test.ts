import {
  assertStrictEquals,
} from "https://deno.land/std@0.162.0/testing/asserts.ts";
import { isRFC3339Date } from "./time.ts";

Deno.test("2022-11-11Z is a Gregorian ISO date", (): void => {
  assertStrictEquals(isRFC3339Date("2022-11-11Z"), true);
  assertStrictEquals(isRFC3339Date("20221111"), false);
});
