import { cors } from "./headers.ts";
export const options = (_request: Request): Response =>
  new Response(undefined, {
    status: 204,
    headers: cors,
  });
