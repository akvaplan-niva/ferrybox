import { handlers } from "./handlers.ts";
import { basicAuthUnlessSafe } from "scrypt_basic_auth/mod.ts";
import { internalServerError, methodNotAllowed } from "./error_responses.ts";
import { FetchHandler } from "./types.ts";

import { serveDir } from "http/file_server.ts";

const methodNotAllowedHandler: FetchHandler = (_r: Request) =>
  methodNotAllowed();

export const createFerryBoxServer =
  (): FetchHandler => async (request: Request): Promise<Response> => {
    const authResponse = await basicAuthUnlessSafe(request);
    if (!authResponse.ok) {
      return authResponse;
    }

    const { pathname } = new URL(request.url);

    if (pathname.startsWith("/static")) {
      return serveDir(request, {
        fsRoot: import.meta.resolve("./").replace("file:/", ""),
      });
    }

    const handler: FetchHandler = handlers.get(request.method.toUpperCase()) ??
      methodNotAllowedHandler;

    try {
      return handler(request);
    } catch (e) {
      console.error(e);
      return internalServerError();
    }
  };
