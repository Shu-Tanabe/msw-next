import { HttpResponse } from "msw";
import { CombinedError } from "urql";

export const graphqlError = (path: string, code: string) => {
  return HttpResponse.json<{ data: null; errors: CombinedError[] }>({
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
            extensions: { code },
          },
        ],
      }),
    ],
    data: null,
  });
};
