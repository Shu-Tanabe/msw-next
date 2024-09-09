import { graphql, HttpResponse } from "msw";
import type { CombinedError } from "urql";
import { faker } from "../faker";

const API_NAME = "user";

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
  () => {
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
