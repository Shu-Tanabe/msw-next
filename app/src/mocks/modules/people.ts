import { graphql, HttpResponse } from "msw";
import { faker } from "../faker";

const API_NAME = "AllPeople";

export type People = {
  allPeople: {
    edges: {
      node: {
        id: string;
        name: string;
      };
    }[];
  };
};

export const peopleQueryhandler = graphql.query<People>(API_NAME, () => {
  return HttpResponse.json({
    data: {
      allPeople: {
        edges: Array.from({ length: 10 }, () => ({
          node: {
            id: faker.string.uuid(),
            name: faker.person.fullName(),
          },
        })),
      },
    },
    errors: null,
  });
});
