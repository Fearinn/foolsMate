import { BattlePass, ErrorMessage, Loader, MainTitle } from "@/components";
import { Season } from "@/components/BattlePass/battlePass.types";
import {
  getAvatarItemsByIds,
  getBackgrounds,
  getBattlePassSeason,
} from "@/services";
import styles from "@/styles/Home.module.scss";
import { useBattlePassSeason } from "@/utils/hooks/battlePass";
import { Heading } from "@chakra-ui/react";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import Head from "next/head";

export async function getStaticProps() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 30,
      },
    },
  });

  let results: Partial<Season> = {};

  try {
    results = await queryClient.fetchQuery(["getBattlePassSeason"], () =>
      getBattlePassSeason(["AVATAR_ITEM"])
    );
  } catch (error) {
    console.log(error);
  }

  const ids: string[] = [];

  if (results.rewards) {
    results.rewards.forEach((reward) => {
      if (reward.avatarItemId) ids.push(reward.avatarItemId);
      if (reward.avatarItemIdFemale) ids.push(reward.avatarItemIdFemale);
      if (reward.avatarItemIdMale) ids.push(reward.avatarItemIdMale);
    });
  }

  if (results.seasonBackgroundId) {
    await queryClient.prefetchQuery(["getBackgrounds"], () =>
      getBackgrounds(results.seasonBackgroundId || "")
    );

    await queryClient.prefetchQuery(["getAvatarItemsByIds", ids], () =>
      getAvatarItemsByIds(ids)
    );
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60 * 60 * 24,
  };
}

export default function Home() {
  const { data, isLoading, error } = useBattlePassSeason(["AVATAR_ITEM"]);

  function handleQuery() {
    if (isLoading) return <Loader />;

    if (!data || error) {
      return <ErrorMessage />;
    }

    return <BattlePass {...data}></BattlePass>;
  }

  return (
    <>
      <Head>
        <title>{"Fool's Mate: Wolvesville Online Tracker"}</title>
      </Head>
      <main className={styles.home}>
        {" "}
        <MainTitle title="Welcome to Fool's Mate, the Wolvesville Online tracker!" />
        <Heading size="md">{"What's new in Wolvesville?"}</Heading>
        {handleQuery()}
      </main>
    </>
  );
}
