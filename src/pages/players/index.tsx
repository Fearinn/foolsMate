import { colors } from "@/assets/cssVariables";
import { ErrorMessage, Loader } from "@/components";
import { PlayerDashboard } from "@/components/players/PlayerDashboard";
import { useSinglePlayer } from "@/utils/hooks/players";
import { Button, Input } from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";
import styles from "./PlayersHome.module.scss";

export default function PlayerHome() {
  const [username, setUsername] = useState("Desconhecido");
  const [newUsername, setNewUsername] = useState("");

  const { data, isLoading, error } = useSinglePlayer(username);

  function handleQuery() {
    if (isLoading) return <Loader />;

    if (!data || error) return <ErrorMessage />;

    return <PlayerDashboard {...data[0]} />;
  }

  return (
    <>
      <Head>
        <title>wolvesville Wiki - Players</title>
      </Head>
      <main className={styles.home}>
        <form
          className={styles.form}
          onSubmit={(event) => {
            event.preventDefault();
            setUsername(newUsername);
          }}
        >
          <Input
            width="auto"
            size="md"
            type="text"
            variant="filled"
            placeholder="username"
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
        </form>
        {handleQuery()}
      </main>
    </>
  );
}
