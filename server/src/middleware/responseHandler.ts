import type { Context } from 'hono';
import { createMiddleware } from 'hono/factory';
import type {
  ClientErrorStatusCode,
  ContentfulStatusCode,
  InfoStatusCode,
  RedirectStatusCode,
  ServerErrorStatusCode,
  StatusCode,
  SuccessStatusCode,
  UnofficialStatusCode,
} from 'hono/utils/http-status';

type successStatusCodesHandler = Exclude<
  ContentfulStatusCode,
  ClientErrorStatusCode | ServerErrorStatusCode | UnofficialStatusCode
>;

type errorStatusCodesHandler = Exclude<
  StatusCode,
  InfoStatusCode | SuccessStatusCode | RedirectStatusCode
>;

function successResponse(c: Context) {
  return <E>(data: E, status: successStatusCodesHandler = 200) => {
    return c.json(
      {
        status: true,
        data,
      },
      status
    );
  };
}

function errorResponse(c: Context) {
  return <E>(data: E, status: errorStatusCodesHandler = 500) => {
    return c.json(
      {
        status: false,
        data,
      },
      status
    );
  };
}

export type successResponseType = ReturnType<typeof successResponse>;
export type errorResponseType = ReturnType<typeof errorResponse>;

export const responseHandler = createMiddleware<{
  Variables: {
    error: errorResponseType;
    success: successResponseType;
  };
}>(async (c: Context, next) => {
  c.set('error', errorResponse(c));
  c.set('success', successResponse(c));
  await next();
});
