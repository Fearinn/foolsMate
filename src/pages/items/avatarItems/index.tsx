import {
  AvatarItemCard,
  AvatarItemsFilters,
  ErrorMessage,
  Loader,
  MainTitle,
  Stats
} from "@/components";
import { getAvatarItems } from "@/services";
import { useAvatarItemStore } from "@/store/avatarItem";
import { useAvatarItems } from "@/utils/hooks/avatarItems";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import Head from "next/head";
import styles from "../CardList.module.scss";

export async function getStaticProps() {
  const queryClient = new QueryClient();

  const initialFilter = { page: 1, limit: 100 };

  await queryClient.prefetchQuery(
    ["getAvatarItems", initialFilter],
    () => getAvatarItems(initialFilter),
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

function AvatarItems() {
  const [filters, limit] = useAvatarItemStore((state) => [
    state.filters,
    state.filters.limit,
  ]);

  const { data, isLoading, error } = useAvatarItems(filters);

  const totalCount = Number(data?.totalCount);
  const pageCount = Number(limit);

  const numberOfPages =
    totalCount && pageCount ? Math.ceil(totalCount / pageCount) : 1;

  function handleQuery() {
    if (isLoading) return <Loader />;

    if (!data || error) {
      return <ErrorMessage />;
    }

    return (
      <>
        <Stats {...data} />
        <ul className={styles.list}>
          {data.items.length ? (
            data.items.map((item) => {
              return (
                <li key={item.id} className={styles.item}>
                  <AvatarItemCard {...item} />
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
            <AvatarItemsFilters numberOfPages={numberOfPages} />
          </div>
          {handleQuery()}
        </section>
      </main>
    </>
  );
}

export default AvatarItems;
