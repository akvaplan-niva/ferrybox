import { get } from "./get.ts";
import { post } from "./post.ts";
import { options } from "./options.ts";
import { FetchHandler } from "./types.ts";

export const handlers = new Map<string, FetchHandler>([
  ["POST", post],
  ["GET", get],
  ["OPTIONS", options],
]);
