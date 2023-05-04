import { BattlePass } from "@/components/BattlePass";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Loader } from "@/components/Loader";
import { MainTitle } from "@/components/MainTitle";
import { useBattlePassSeason } from "@/utils/hooks/useBattlePassSeason";
import { Heading } from "@chakra-ui/react";
import Head from "next/head";
import { StyledHome } from "./StyledHome";

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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StyledHome>
        <MainTitle title="Welcome to Wolvesville Wiki!" />
        <Heading size="md">{"What's new in Wolvesville?"}</Heading>
        <BattlePass {...data}></BattlePass>
      </StyledHome>
    </>
  );
}
