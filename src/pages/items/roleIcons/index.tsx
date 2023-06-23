import {
  ErrorMessage,
  Loader,
  MainTitle,
  RoleIconCard,
  RoleIconFilters,
  Stats
} from "@/components";
import { getRoleIcons } from "@/services";
import { useRoleIconStore } from "@/store/roleIcon";
import { useRoleIcons } from "@/utils/hooks/roleIcons";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import Head from "next/head";
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

  const { data, isLoading, error } = useRoleIcons(filters);

  const totalCount = Number(data?.totalCount);
  const pageCount = Number(limit);

  const numberOfPages =
    totalCount && pageCount ? Math.ceil(totalCount / pageCount) : 1;

  function handleQuery() {
    if (isLoading) return <Loader />;

    if (!data || error) return <ErrorMessage />;

    return (
      <>
        <Stats {...data} />
        <ul className={styles.list}>
          {data.items.length ? (
            data.items.map((icon) => (
              <li key={icon.id} className={styles.item}>
                <RoleIconCard {...icon} />
              </li>
            ))
          ) : (
            <ErrorMessage>
              No icon was found with the selected filters
            </ErrorMessage>
          )}
        </ul>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{"Fool's Mate - Role Icons"}</title>
      </Head>
      <main>
        <section className={styles["card-list"]}>
          <div className={styles.container}>
            <MainTitle title="Role Icons" />
            <RoleIconFilters numberOfPages={numberOfPages} />
          </div>
          {handleQuery()}
        </section>
      </main>
    </>
  );
}

export default RoleIcons;
