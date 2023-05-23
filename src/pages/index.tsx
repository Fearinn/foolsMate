import { BattlePass, ErrorMessage, Loader, MainTitle } from "@/components";
import {
  getAvatarItemsByIds,
  getBackgrounds,
  getBattlePassSeason,
} from "@/services";
import styles from "@/styles/Home.module.scss";
import { useBattlePassSeason } from "@/utils/hooks/useBattlePassSeason";
import { Heading } from "@chakra-ui/react";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import Head from "next/head";

export async function getServerSideProps() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 30,
      },
    },
  });

  const { rewards, seasonBackgroundId } = await queryClient.fetchQuery(
    ["getBattlePassSeason"],
    () => getBattlePassSeason(["AVATAR_ITEM"])
  );

  const ids: string[] = [];

  rewards.forEach((reward) => {
    if (reward.avatarItemId) ids.push(reward.avatarItemId);
    if (reward.avatarItemIdFemale) ids.push(reward.avatarItemIdFemale);
    if (reward.avatarItemIdMale) ids.push(reward.avatarItemIdMale);
  });

  await queryClient.prefetchQuery(["getBackgrounds"], () =>
    getBackgrounds(seasonBackgroundId)
  );

  await queryClient.prefetchQuery(["getAvatarItemsByIds", ids], () =>
    getAvatarItemsByIds(ids)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function Home() {
  const { data, isLoading, error } = useBattlePassSeason(["AVATAR_ITEM"]);

  function handleQuery() {
    if (isLoading) return <Loader />;

    if (!data || error) {
      return <ErrorMessage />;
    }

    return (
      <>
        <MainTitle title="Welcome to Wolvesville Wiki!" />
        <Heading size="md">{"What's new in Wolvesville?"}</Heading>
        <BattlePass {...data}></BattlePass>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Wolvesville Wiki</title>
      </Head>
      <main className={styles.home}>{handleQuery()}</main>
    </>
  );
}
