export const notAllowed = (request: Request) =>
  new Response(
    `405 ${request.method} method not allowed`,
    { status: 405 },
  );

export const internalServerError = (_request: Request) =>
  new Response(
    `500 Internal Server Error`,
    { status: 500 },
  );
