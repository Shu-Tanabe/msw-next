import { HttpResponse } from "msw";

const notFound = (path: string) =>
  HttpResponse.json({
    errors: [
      {
        message: "internal_error",
        locations: [
          {
            line: 2,
            column: 3,
          },
        ],
        path: [path],
        extensions: {
          code: "NOT_FOUND",
        },
      },
    ],
    data: null,
  });

export const errors = { notFound };
