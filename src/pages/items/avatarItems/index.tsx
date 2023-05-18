import {
  AvatarItemCard,
  AvatarItemsFilters,
  ErrorMessage,
  Loader,
} from "@/components";
import { getAvatarItems } from "@/services";
import { useAvatarItemStore } from "@/store/avatarItem";
import { useAvatarItems } from "@/utils/hooks/useAvatarItems";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import Head from "next/head";
import { useEffect, useState } from "react";
import { StyledCardList } from "../../../styles/StyledCardList";

export async function getServerSideProps() {
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
  };
}

function AvatarItems() {
  const filters = useAvatarItemStore((state) => state.filters);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const itemsPerPage = useAvatarItemStore((state) => state.filters.limit);

  const { data, isLoading, error } = useAvatarItems(filters);

  useEffect(() => {
    const totalCount = Number(data?.totalCount);
    const pageCount = Number(itemsPerPage);
    if (totalCount && pageCount) {
      setNumberOfPages(Math.ceil(totalCount / pageCount));
    } else {
      setNumberOfPages(1);
    }
  }, [data, itemsPerPage]);

  if (isLoading)
    return (
      <main>
        <Loader />
      </main>
    );

  if (!data || error) {
    return (
      <main>
        <ErrorMessage />
      </main>
    );
  }

  return (
    <>
      <Head>
        <title>Wolvesville Wiki - Avatar Items</title>
      </Head>
      <main>
        <StyledCardList>
          <AvatarItemsFilters numberOfPages={numberOfPages} />
          <div className="stats">
            <p>
              Results in this page: <span>{data.count}</span>
            </p>
            <p>
              Current page: <span>{data.currentPage}</span>
            </p>
            <p>
              Total of results: <span>{data.totalCount}</span>
            </p>
          </div>
          <ul>
            {data.items.length ? (
              data.items.map((item) => {
                return (
                  <li key={item.id}>
                    <AvatarItemCard {...item} />
                  </li>
                );
              })
            ) : (
              <ErrorMessage>
                No item was found with the selected filters!
              </ErrorMessage>
            )}
          </ul>
        </StyledCardList>
      </main>
    </>
  );
}

export default AvatarItems;
