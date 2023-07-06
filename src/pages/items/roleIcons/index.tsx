import {
  ErrorMessage,
  Loader,
  MainTitle,
  RoleIconCard,
  RoleIconFilters,
  Stats,
} from "@/components";
import { getRoleIcons } from "@/services/items/roleIcons";

import { useRoleIconStore } from "@/store/roleIcon";
import { useLocalStorage } from "@/utils/hooks/localStorage";
import { useRoleIcons } from "@/utils/hooks/roleIcons";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import Head from "next/head";
import { useState } from "react";
import styles from "./RoleIcons.module.scss";

export async function getStaticProps() {
  const queryClient = new QueryClient();

  const initialFilter = { page: 1, limit: 25 };

  await queryClient.prefetchQuery({
    queryKey: ["getRoleIcons", initialFilter],
    queryFn: () => getRoleIcons(initialFilter),
    staleTime: 1000 * 60 * 30,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60 * 60 * 24,
  };
}

function RoleIcons() {
  const filters = useRoleIconStore((state) => state.filters);

  const [onlyFavorites, setOnlyFavorites] = useState(false);

  const [favoriteIds, setFavoriteIds] = useLocalStorage("favoriteRoleIcons");

  const maxFavorites = 25;

  const maxFavoritesLength = maxFavorites * 3;

  const { data, isLoading, error } = useRoleIcons(
    onlyFavorites
      ? {
          ...filters,
          page: 1,
          idList: favoriteIds,
        }
      : filters
  );

  const totalCount = Number(data?.totalCount);
  const pageCount = Number(filters.limit);

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
            data.items.map((item) => {
              const isFavorite = favoriteIds.includes(item.id);
              return (
                <li key={item.id} className={styles.item}>
                  <RoleIconCard
                    {...item}
                    addFavorite={(newFavorite) => {
                      if (
                        favoriteIds.replaceAll(":", "").length >=
                        maxFavoritesLength
                      ) {
                        return alert(
                          `The max of favorite icons is ${maxFavorites}. Please remove at least one.`
                        );
                      }

                      setFavoriteIds(favoriteIds + `:${newFavorite}`);
                    }}
                    removeFavorite={(previousFavorite) =>
                      setFavoriteIds(
                        favoriteIds.replace(`:${previousFavorite}`, "")
                      )
                    }
                    isFavorite={isFavorite}
                  />
                </li>
              );
            })
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
            <RoleIconFilters
              numberOfPages={numberOfPages}
              onlyFavorites={onlyFavorites}
              changeOnlyFavorites={setOnlyFavorites}
            />
          </div>
          {handleQuery()}
        </section>
      </main>
    </>
  );
}

export default RoleIcons;
