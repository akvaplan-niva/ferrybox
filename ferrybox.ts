import { FerryBoxCreateOptions, FetchHandler } from "./types.ts";
import { basicAuthUnlessSafe } from "scrypt_basic_auth/mod.ts";
import { serveDir } from "http/file_server.ts";

const notAllowed = (request: Request) =>
  new Response(
    `405 ${request.method} not allowed`,
    { status: 405 },
  );

export const createFerryBoxServer =
  (options: FerryBoxCreateOptions): FetchHandler =>
  async (request: Request): Promise<Response> => {
    const { pathname } = new URL(request.url);
    if (pathname.startsWith("/static/")) {
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
      console.error(e);
      throw "Service Unavailable";
    }
  };
