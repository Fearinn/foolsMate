import {
  AvatarItemCard,
  AvatarItemsFilters,
  Button,
  ErrorMessage,
  FavoritesSharing,
  Loader,
  MainTitle,
  Stats,
} from "@/components";
import { getAvatarItems } from "@/services/items/avatarItems";
import { useAvatarItemStore } from "@/store/avatarItem";
import { useAvatarItems } from "@/utils/hooks/avatarItems";
import { useLocalStorage } from "@/utils/hooks/localStorage";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import Head from "next/head";
import { useState } from "react";
import styles from "./AvatarItems.module.scss";

export async function getStaticProps() {
  const queryClient = new QueryClient();

  const initialFilter = { page: 1, limit: 100 };

  await queryClient.prefetchQuery({
    queryKey: ["getAvatarItems", initialFilter],
    queryFn: () => getAvatarItems(initialFilter),
    staleTime: 1000 * 60 * 30,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60 * 60 * 24,
  };
}

function AvatarItems() {
  const filters = useAvatarItemStore((state) => state.filters);

  const [favoriteIds, setFavoriteIds] = useLocalStorage("favoriteAvatarItems");

  const [onlyFavorites, setOnlyFavorites] = useState(false);

  const { data, isLoading, error } = useAvatarItems(
    onlyFavorites ? { ...filters, page: 1, idList: favoriteIds } : filters
  );

  const maxFavorites = 100;

  const maxFavoritesLength = maxFavorites * 3;

  const totalCount = Number(data?.totalCount);
  const pageCount = Number(filters.limit);

  const numberOfPages =
    totalCount && pageCount ? Math.ceil(totalCount / pageCount) : 1;

  function handleQuery() {
    if (isLoading) return <Loader />;

    if (!data || error) {
      return <ErrorMessage />;
    }

    return (
      <>
        <div className={styles["stats-and-favorites"]}>
          <Stats {...data} count={data.items.length} />
          <FavoritesSharing
            favorites={favoriteIds}
            changeFavorites={setFavoriteIds}
            maxFavoritesLength={maxFavoritesLength}
          />
        </div>
        <ul className={styles.list}>
          {data.items.length ? (
            data.items.map((item) => {
              const isFavorite = favoriteIds.includes(item.id);
              return (
                <li key={item.id} className={styles.item}>
                  <AvatarItemCard
                    {...item}
                    addFavorite={(newFavorite) => {
                      if (
                        favoriteIds.replaceAll(":", "").length >=
                        maxFavoritesLength
                      ) {
                        return alert(
                          `The max of favorite items is ${maxFavorites}. Please remove at least one.`
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
            <li>
              <ErrorMessage>
                No item was found with the selected filters!
              </ErrorMessage>
            </li>
          )}
        </ul>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{"Fool's Mate - Avatar Items"}</title>
      </Head>
      <main>
        <section className={styles["card-list"]}>
          <div className={styles.container}>
            <MainTitle title="Avatar Items" />
            <AvatarItemsFilters
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

export default AvatarItems;
