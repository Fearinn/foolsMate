import { colors } from "@/assets/cssVariables";
import {
  Button,
  ErrorMessage,
  Input,
  Loader,
  MainTitle,
  PlayerDashboard
} from "@/components";
import { Season } from "@/components/BattlePass/battlePass.types";
import { PlayersComparison } from "@/components/players/PlayersComparison";
import { getBattlePassSeason, getRewards } from "@/services";
import { getBackgrounds } from "@/services/items/backgrounds";
import { useLocalStorage } from "@/utils/hooks/localStorage";
import { usePlayersComparison, useSinglePlayer } from "@/utils/hooks/players";
import { Heading, useColorMode } from "@chakra-ui/react";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Head from "next/head";
import { useRef, useState } from "react";
import styles from "./PlayersHome.module.scss";

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
    results = await queryClient.fetchQuery({
      queryKey: ["getBattlePassSeason"],
      queryFn: getBattlePassSeason,
    });
  } catch (error) {
    console.log(error);
  }

  if (results.seasonBackgroundId) {
    await queryClient.prefetchQuery({
      queryKey: ["getBackgrounds"],
      queryFn: () => getBackgrounds(results.seasonBackgroundId || ""),
    });

    await queryClient.prefetchQuery({
      queryKey: ["getRewards"],
      queryFn: getRewards,
    });
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60 * 60 * 24,
  };
}

export default function PlayerHome() {
  const [username, setUsername] = useLocalStorage("playerDashboard");
  const [username2, setUsername2] = useState("");
  const newUsername = useRef("");
  const newUsername2 = useRef("");

  const {
    data: singleData,
    isLoading: singleIsLoading,
    error: singleError,
  } = useSinglePlayer(username);

  const {
    data: comparisonData,
    isInitialLoading: comparisonIsLoading,
    error: comparisonError,
  } = usePlayersComparison(username, username2);

  function handleQuery() {
    if (!username) return;

    if (singleIsLoading) return <Loader />;

    if (
      singleError instanceof AxiosError &&
      singleError.response?.status === 404
    )
      return <ErrorMessage>Player {username} not found </ErrorMessage>;

    if (singleError || !singleData) return <ErrorMessage />;

    if (!username2) return <PlayerDashboard {...singleData[0]} />;

    if (comparisonIsLoading) return <Loader />;

    if (
      comparisonError instanceof AxiosError &&
      comparisonError.response?.status === 404
    )
      return <ErrorMessage>Player {username2} not found </ErrorMessage>;

    if (username === newUsername2.current)
      return (
        <ErrorMessage>
          You can&apos;t compare players to themselves
        </ErrorMessage>
      );

    if (comparisonError || !comparisonData) return <ErrorMessage />;

    return <PlayersComparison {...comparisonData} />;
  }

  const { colorMode } = useColorMode();

  return (
    <>
      <Head>
        <title>{"Fool's Mate - Players"}</title>
      </Head>
      <main className={styles.home}>
        <div className={styles.permanent}>
          <MainTitle title="Players" />
          <div className={styles.forms}>
            <form
              className={styles.form}
              onSubmit={(event) => {
                event.preventDefault();
                if (username2) setUsername2("");
                setUsername(newUsername.current);
              }}
            >
              <Heading size="sm" as="label" htmlFor="username-input">
                Search a player by their username
              </Heading>
              <div className={styles.container}>
                <Input
                  id="username-input"
                  minLength={3}
                  required
                  hasLabel
                  placeholder="JohnDoe"
                  bgColor={
                    colorMode === "light"
                      ? colors.backgroundMain
                      : colors.dark.backgroundMain
                  }
                  onChange={(event) => {
                    newUsername.current = event.target.value;
                  }}
                />
                <Button type="submit">Search</Button>
              </div>
            </form>
            <form
              className={styles.form}
              onSubmit={(event) => {
                event.preventDefault();
                setUsername2(newUsername2.current);
              }}
            >
              <Heading size="sm" as="label" htmlFor="username2-input">
                Compare to
              </Heading>
              <div className={styles.container}>
                <Input
                  id="username2-input"
                  minLength={3}
                  required
                  hasLabel
                  placeholder="MaryJane"
                  bgColor={
                    colorMode === "light"
                      ? colors.backgroundMain
                      : colors.dark.backgroundMain
                  }
                  onChange={(event) => {
                    newUsername2.current = event.target.value;
                  }}
                />
                <Button type="submit">Compare</Button>
              </div>
            </form>
          </div>
        </div>
        {handleQuery()}
      </main>
    </>
  );
}
