"use client";

import { gql, useQuery } from "urql";
import styles from "./page.module.css";
import { People } from "@/mocks/modules/people";

const peopleQuery = gql`
  query AllPeople {
    allPeople {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

const swQuery = gql`
  query AllFilms {
    allFilms {
      films {
        title
        director
        releaseDate
      }
    }
  }
`;

type FilmsQuery = {
  allFilms: {
    films: {
      title: string;
      director: string;
      releaseDate: string;
    }[];
  };
};

export default function Home() {
  const [{ data: peopleData, fetching: peopleFetching }] = useQuery<People>({
    query: peopleQuery,
  });

  const [{ data: filmsData, fetching: FilmsFetching }] = useQuery<FilmsQuery>({
    query: swQuery,
  });

  return (
    <div className={styles.page}>
      <main
        className={styles.main}
        style={{ display: "flex", flexDirection: "row" }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2>Films</h2>
          {FilmsFetching ? (
            <p>loading</p>
          ) : filmsData ? (
            filmsData.allFilms.films.map((film) => (
              <div key={film.title}>
                <h3>{film.title}</h3>
                <p>Directed by {film.director}</p>
                <p>Released on {film.releaseDate}</p>
              </div>
            ))
          ) : (
            <p>no data</p>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2>People</h2>
          {peopleFetching ? (
            <p>loading</p>
          ) : peopleData ? (
            peopleData.allPeople.edges.map((edge) => (
              <p key={edge.node.id}>{edge.node.name}</p>
            ))
          ) : (
            <p>no data</p>
          )}
        </div>
      </main>
    </div>
  );
}
