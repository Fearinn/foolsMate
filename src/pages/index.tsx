import { BattlePass } from "@/components/BattlePass";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Loader } from "@/components/Loader";
import { MainTitle } from "@/components/MainTitle";
import { getBattlePassSeason } from "@/services";
import { useBattlePassSeason } from "@/utils/hooks/useBattlePassSeason";
import { Heading } from "@chakra-ui/react";
import Head from "next/head";
import { dehydrate, QueryClient } from "react-query";
import { StyledHome } from "./StyledHome";

export async function getStaticProps() {
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
        <title>Wolvesville Wiki</title>s
      </Head>
      <StyledHome>
        <MainTitle title="Welcome to Wolvesville Wiki!" />
        <Heading size="md">{"What's new in Wolvesville?"}</Heading>
        <BattlePass {...data}></BattlePass>
      </StyledHome>
    </>
  );
}
