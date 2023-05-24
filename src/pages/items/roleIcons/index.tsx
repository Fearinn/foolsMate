import {
  ErrorMessage,
  Loader,
  RoleIconCard,
  RoleIconFilters,
  Stats,
} from "@/components";
import { getRoleIcons } from "@/services";
import { useRoleIconStore } from "@/store/roleIcon";
import { useRoleIcons } from "@/utils/hooks/useRoleIcons";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../CardList.module.scss";

export async function getStaticProps() {
  const queryClient = new QueryClient();

  const initialFilter = { page: 1, limit: 25 };

  await queryClient.prefetchQuery(
    ["getRoleIcons", initialFilter],
    () => getRoleIcons(initialFilter),
    {
      staleTime: 1000 * 60 * 30,
    }
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60 * 60 * 24,
  };
}

function RoleIcons() {
  const [filters, limit] = useRoleIconStore((state) => [
    state.filters,
    state.filters.limit,
  ]);
  const [numberOfPages, setNumberOfPages] = useState(1);

  const { data, isLoading, error } = useRoleIcons(filters);

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
      <div className={styles["card-list"]}>
        <RoleIconFilters numberOfPages={numberOfPages} />
        <Stats {...data} />
        <ul className={styles.list}>
          {data.items.map((icon) => (
            <li key={icon.id} className={styles.item}>
              <RoleIconCard {...icon} />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Wolvesville Wiki - Role Icons</title>
      </Head>
      <main>{handleQuery()}</main>
    </>
  );
}

export default RoleIcons;
