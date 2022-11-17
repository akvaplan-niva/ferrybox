import { ferryboxOptions } from "./config.ts";
import { FerryBoxCreateOptions, FetchHandler } from "./types.ts";
import { internalServerError, notAllowed } from "./error_responses.ts";
import { basicAuthUnlessSafe } from "scrypt_basic_auth/mod.ts";
import { serveDir } from "http/file_server.ts";

export const createFerryBoxServer =
  (options: FerryBoxCreateOptions = ferryboxOptions): FetchHandler =>
  async (request: Request): Promise<Response> => {
    const { pathname } = new URL(request.url);
    if (pathname.startsWith("/static")) {
      return serveDir(request, {
        fsRoot: import.meta.resolve("./").replace("file:/", ""),
      });
    }
    const response = await basicAuthUnlessSafe(request);
    if (!response.ok) {
      return response;
    }
    const { handlers } = options;
    const method = request.method.toUpperCase();
    const handler: FetchHandler = handlers.get(method) ?? notAllowed;
    try {
      return handler(request);
    } catch (e) {
      //@todo Persist handler errors
      console.error(e);
      return internalServerError(request);
    }
  };
