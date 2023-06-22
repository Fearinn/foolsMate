import {
  ErrorMessage,
  Loader,
  MainTitle,
  RoleCard,
  RolesFilter,
  Stats,
} from "@/components";
import { getRoles } from "@/services/roles";
import { useRolesStore } from "@/store/roles";
import { useRoles } from "@/utils/hooks/roles";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "./Roles.module.scss";

export async function getStaticProps() {
  const queryClient = new QueryClient();

  const initialFilter = { page: 1, limit: 20 };

  await queryClient.prefetchQuery({
    queryKey: ["getRoles", initialFilter],
    queryFn: () => getRoles(initialFilter),
    staleTime: 1000 * 60 * 30,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60 * 60 * 24,
  };
}

export default function Roles() {
  const [filters, limit] = useRolesStore((state) => [
    state.filters,
    state.filters.limit,
  ]);

  const [numberOfPages, setNumberOfPages] = useState(1);

  const { data, isLoading, error } = useRoles(filters);

  useEffect(() => {
    const totalCount = Number(data?.totalCount);
    const pageCount = Number(limit);
    if (totalCount && pageCount) {
      setNumberOfPages(Math.ceil(totalCount / pageCount));
    } else {
      setNumberOfPages(1);
    }
  }, [data, limit]);

  function handleQuery() {
    if (isLoading) return <Loader />;

    if (!data || error) return <ErrorMessage />;

    return (
      <section className={styles["card-list"]}>
        <div className={styles.container}>
          <MainTitle title="Roles" />
          <RolesFilter numberOfPages={numberOfPages} />
        </div>
        <Stats {...data} />
        <ul className={styles.list}>
          {data.items.map((role) => (
            <li key={role.id} className={styles.item}>
              <RoleCard {...role} />
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <>
      <Head>
        <title>{"Fool's Mate - Roles"}</title>
      </Head>
      <main>{handleQuery()}</main>
    </>
  );
}
