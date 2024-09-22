import { HttpResponse } from "msw";
import { CombinedError } from "urql";

export const notFound = (path: string) =>
  HttpResponse.json<{ data: null; errors: CombinedError[] }>({
    errors: [
      new CombinedError({
        graphQLErrors: [
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
      }),
    ],
    data: null,
  });
