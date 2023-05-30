import { colors } from "@/assets/cssVariables";
import { ErrorMessage, Loader } from "@/components";
import { PlayerDashboard } from "@/components/players/PlayerDashboard";
import { useSinglePlayer } from "@/utils/hooks/players";
import { Button, Heading, Input } from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";
import styles from "./PlayersHome.module.scss";

export default function PlayerHome() {
  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");

  const { data, isLoading, error } = useSinglePlayer(username);

  function handleQuery() {
    if (!username) return;

    if (isLoading) return <Loader />;

    if (error || !data)
      return <ErrorMessage>Player {username} not found </ErrorMessage>;

    return <PlayerDashboard {...data[0]} />;
  }

  return (
    <>
      <Head>
        <title>wolvesville Wiki - Players</title>
      </Head>
      <main className={styles.home}>
        <div className={styles.permanent}>
          <Heading as="h1" size="lg">
            Player dashboard
          </Heading>
          <form
            className={styles.form}
            onSubmit={(event) => {
              event.preventDefault();
              setUsername(newUsername);
            }}
          >
            <Heading size="sm" as="label" htmlFor="username-input">
              Search a player by their username
            </Heading>
            <div className={styles.container}>
              <Input
                id="username-input"
                width="auto"
                size="md"
                type="text"
                variant="filled"
                placeholder="JohnDoe"
                _focusVisible={{ border: "none" }}
                onChange={(event) => {
                  setNewUsername(event.target.value);
                }}
                value={newUsername}
                bgColor={colors.mainBackGround}
              />

              <Button
                type="submit"
                bgColor={colors.mainBrand}
                _hover={{ background: colors.mainBrand, opacity: 0.8 }}
                color={colors.mainFont}
              >
                Search
              </Button>
            </div>
          </form>
        </div>
        {handleQuery()}
      </main>
    </>
  );
}
