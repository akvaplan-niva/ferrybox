import {
  assertStrictEquals,
} from "https://deno.land/std@0.162.0/testing/asserts.ts";
import { isGregorianISODate } from "./time.ts";

Deno.test("2022-11-11Z is a Gregorian ISO date", (): void => {
  assertStrictEquals(isGregorianISODate("2022-11-11Z"), true);
  assertStrictEquals(isGregorianISODate("20221111"), false);
});
