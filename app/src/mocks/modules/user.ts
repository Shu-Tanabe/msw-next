import { graphql, HttpResponse } from "msw";
import type { CombinedError } from "urql";
import { faker } from "../faker";
import { graphqlError } from "./error";

const API_NAME = "User";

export type User = {
  user: {
    id: string;
    name: string;
    mail: string;
  };
};

export type UserQuery = {
  data: User | null | undefined;
  error: CombinedError | null | undefined;
};

export type UserQueryVariable = {
  id: string;
};

const userQueryhandler = graphql.query<User, UserQueryVariable>(
  API_NAME,
  ({ variables }) => {
    if (variables.id === "not-found") {
      return graphqlError(API_NAME, "NOT_FOUND");
    }
    return HttpResponse.json({
      data: {
        user: {
          id: faker.string.uuid(),
          name: faker.person.fullName(),
          mail: faker.internet.email(),
        },
      },
      errors: null,
    });
  }
);

export const userQueryMock = {
  name: API_NAME,
  handler: userQueryhandler,
};
