"use client";

import { gql, useQuery } from "urql";
import styles from "./page.module.css";
import { User, UserQueryVariable } from "@/mocks/modules/user";
import { notFound } from "next/navigation";

const userQuery = gql`
  query user($id: String!) {
    user(id: $id) {
      id
      name
      mail
    }
  }
`;

export default function Home() {
  const [{ data, error, fetching }] = useQuery<User, UserQueryVariable>({
    query: userQuery,
    variables: { id: "1" },
  });

  if (error) {
    return <div>error</div>;
  }

  if (fetching) {
    return <div>loading</div>;
  }

  if (data === undefined || data === null) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h2>User</h2>
        <p>id: {data.user.id}</p>
        <p>name: {data.user.name}</p>
        <p>mail: {data.user.mail}</p>
      </main>
    </div>
  );
}
