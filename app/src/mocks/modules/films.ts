import { graphql, HttpResponse } from "msw";
import { faker } from "../faker";

const API_NAME = "AllFilms";

type Films = {
  allFilms: {
    films: {
      title: string;
      director: string;
      releaseDate: string;
    }[];
  };
};

const filmsQueryhandler = graphql.query<Films>(API_NAME, () => {
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

export const filmsQueryMock = {
  name: API_NAME,
  handler: filmsQueryhandler,
};
