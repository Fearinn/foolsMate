import { colors } from "@/assets/cssVariables";
import {
  Button,
  ErrorMessage,
  Input,
  Loader,
  MainTitle,
  PlayerDashboard,
} from "@/components";
import { useLocalStorage } from "@/utils/hooks/localStorage";
import { useSinglePlayer } from "@/utils/hooks/players";
import { Heading } from "@chakra-ui/react";
import { AxiosError } from "axios";
import Head from "next/head";
import { useRef, useState } from "react";
import styles from "./PlayersHome.module.scss";

export default function PlayerHome() {
  const [username, setUsername] = useLocalStorage("playerDashboard");
  const newUsername = useRef("");

  const { data, isLoading, error } = useSinglePlayer(username);

  function handleQuery() {
    if (!username) return;

    if (isLoading) return <Loader />;

    if (error instanceof AxiosError && error.response?.status === 404)
      return <ErrorMessage>Player {username} not found </ErrorMessage>;

    if (error || !data) {
      return <ErrorMessage />;
    }

    return <PlayerDashboard {...data[0]} />;
  }

  return (
    <>
      <Head>
        <title>{"Fool's Mate - Player Dashboard"}</title>
      </Head>
      <main className={styles.home}>
        <div className={styles.permanent}>
          <MainTitle title="Player Dashboard" />
          <form
            className={styles.form}
            onSubmit={(event) => {
              event.preventDefault();
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
                bgColor={colors.mainBackGround}
                onChange={(event) => {
                  newUsername.current = event.target.value;
                }}
              />
              <Button type="submit">Search</Button>
            </div>
          </form>
        </div>
        {handleQuery()}
      </main>
    </>
  );
}
