export const methodNotAllowed = (
  body: BodyInit = "405 Method Not Allowed\n",
  opts: ResponseInit = { status: 405 },
) => new Response(body, opts);

//https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/422
export const unprocessableEntity = (
  body: BodyInit = "422 Unprocessable Entity\n",
  opts: ResponseInit = { status: 422 },
) => new Response(body, opts);

export const internalServerError = (
  body: BodyInit = "500 Internal Server Error\n",
  opts: ResponseInit = { status: 500 },
) => new Response(body, opts);

export const notImplemented = (
  body: BodyInit = "501 Not Implemented\n",
  opts: ResponseInit = { status: 501 },
) => new Response(body, opts);
