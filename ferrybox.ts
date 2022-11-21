import { handlers } from "./handlers.ts";
import { internalServerError, notAllowed } from "./error_responses.ts";
import { basicAuthUnlessSafe } from "scrypt_basic_auth/mod.ts";
import { serveDir } from "http/file_server.ts";
import { FetchHandler } from "./types.ts";

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
      notAllowed;

    try {
      return handler(request);
    } catch (e) {
      console.error(e);
      return internalServerError(request);
    }
  };
