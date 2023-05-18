import { ErrorMessage, Loader } from "@/components";
import { RoleIconCard } from "@/components/roleIcon/RoleIconCard";
import { RoleIconFilter } from "@/components/roleIcon/RoleIconFilter";
import { getRoleIcons } from "@/services";
import { useRoleIconStore } from "@/store/roleIcon";
import { StyledCardList } from "@/styles/StyledCardList";
import { useRoleIcons } from "@/utils/hooks/useRoleIcons";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import Head from "next/head";
import { useEffect, useState } from "react";

export async function getServerSideProps() {
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

  if (isLoading)
    return (
      <main>
        <Loader />
      </main>
    );

  if (!data || error)
    return (
      <main>
        <ErrorMessage />
      </main>
    );

  return (
    <>
      <Head>
        <title>Wolvesville Wiki - Role Icons</title>
      </Head>
      <main>
        <StyledCardList>
          <RoleIconFilter numberOfPages={numberOfPages} />
          <ul>
            {data.items.map((icon) => (
              <li key={icon.id}>
                <RoleIconCard {...icon} />
              </li>
            ))}
          </ul>
        </StyledCardList>
      </main>
    </>
  );
}

export default RoleIcons;
