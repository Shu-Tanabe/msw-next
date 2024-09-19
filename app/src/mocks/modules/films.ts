import { graphql, HttpResponse } from "msw";
import { faker } from "../faker";

const API_NAME = "Query";

type Films = {
  allFilms: {
    films: {
      title: string;
      director: string;
      releaseDate: string;
    }[];
  };
};

export const filmsQueryhandler = graphql.query<Films>(API_NAME, () => {
  return HttpResponse.json({
    data: {
      allFilms: {
        films: Array.from({ length: 10 }, () => ({
          title: faker.lorem.words(),
          director: faker.person.fullName(),
          releaseDate: faker.date.past().toISOString(),
        })),
      },
    },
    errors: null,
  });
});
