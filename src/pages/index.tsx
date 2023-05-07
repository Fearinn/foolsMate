import { BattlePass } from "@/components/BattlePass";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Loader } from "@/components/Loader";
import { MainTitle } from "@/components/MainTitle";
import { getBattlePassSeason } from "@/services";
import { useBattlePassSeason } from "@/utils/hooks/useBattlePassSeason";
import { Heading } from "@chakra-ui/react";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import Head from "next/head";
import { StyledHome } from "./StyledHome";

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    ["getBattlePassSeason"],
    () => getBattlePassSeason(["AVATAR_ITEM"]),
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

export default function Home() {
  const { data, isLoading, error } = useBattlePassSeason(["AVATAR_ITEM"]);

  if (isLoading)
    return (
      <StyledHome>
        <Loader />
      </StyledHome>
    );

  if (!data || error) {
    return (
      <StyledHome>
        <ErrorMessage />
      </StyledHome>
    );
  }

  return (
    <>
      <Head>
        <title>Wolvesville Wiki</title>
      </Head>
      <StyledHome>
        <MainTitle title="Welcome to Wolvesville Wiki!" />
        <Heading size="md">{"What's new in Wolvesville?"}</Heading>
        <BattlePass {...data}></BattlePass>
      </StyledHome>
    </>
  );
}
