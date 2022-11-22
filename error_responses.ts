// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

const statusMap = new Map<number, string>([[422, "Unprocessable Entity"]]);
export const statusText = (status: number): string =>
  `${status} ${statusMap.get(status)}\n`;

export const methodNotAllowed = (
  body: BodyInit = "405 Method Not Allowed\n",
  opts: ResponseInit = { status: 405 },
) => new Response(body, opts);
export const unprocessableEntity = (
  body: BodyInit = statusText(422),
  opts: ResponseInit,
) => new Response(body, { ...opts, status: 422 });

export const internalServerError = (
  body: BodyInit = "500 Internal Server Error\n",
  opts: ResponseInit = { status: 500 },
) => new Response(body, opts);

export const notImplemented = (
  body: BodyInit = "501 Not Implemented\n",
  opts: ResponseInit = { status: 501 },
) => new Response(body, opts);
