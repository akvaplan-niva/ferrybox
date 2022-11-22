import messageJTDSchema from "./static/schema/message.jtd.json" assert {
  type: "json",
};
import { Message } from "./types.ts";
import { Schema, validate as jsonTypeValidate } from "jtd/mod.ts";
export * from "jtd/mod.ts";

export const validate = (message: Message) =>
  jsonTypeValidate(messageJTDSchema as Schema, message);
