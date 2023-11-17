import { colors } from "@/assets/cssVariables";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Heading, useColorMode } from "@chakra-ui/react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Player } from "../players.types";
import styles from "./PlayersComparison.module.scss";

export function PlayersComparison(players: Player[]) {
  const { colorMode } = useColorMode();

  const player1 = players[0];
  const player2 = players[1];

  const player1Stats = player1.gameStats;
  const player2Stats = player2.gameStats;

  if (!player1Stats)
    return (
      <ErrorMessage>
        {player1.username}&apos;s stats are not available
      </ErrorMessage>
    );

  if (!player2Stats)
    return (
      <ErrorMessage>
        {player2.username}&apos;s stats are not available
      </ErrorMessage>
    );

  const winsByTeam = [
    {
      team: "village",
      [`wins - ${player1.username}`]: player1Stats.villageWinCount,
      [`wins - ${player2.username}`]: player2Stats.villageWinCount,
    },
    {
      team: "werewolf",
      [`wins - ${player1.username}`]: player1Stats.werewolfWinCount,
      [`wins - ${player2.username}`]: player2Stats.werewolfWinCount,
    },
    {
      team: "voting",
      [`wins - ${player1.username}`]: player1Stats.votingWinCount,
      [`wins - ${player2.username}`]: player2Stats.votingWinCount,
    },
    {
      team: "solo",
      [`wins - ${player1.username}`]: player1Stats.soloWinCount,
      [`wins - ${player2.username}`]: player2Stats.soloWinCount,
    },
  ];

  const totalWinsData = [
    {
      key: "total wins",
      [player1.username]: player1Stats.totalWinCount,
      [player2.username]: player2Stats.totalWinCount,
    },
  ];

  const survidedData = [
    {
      key: "survived games",
      [player1.username]: player1Stats.gamesSurvivedCount,
      [player2.username]: player2Stats.gamesSurvivedCount,
    },
  ];

  const winPercentageData = [
    {
      team: "village",
      [`win% - ${player1.username}`]: (
        (player1Stats.villageWinCount /
          (player1Stats.villageWinCount + player1Stats.villageLoseCount)) *
          100 || 0
      ).toFixed(2),
      [`win% - ${player2.username}`]: (
        (player2Stats.villageWinCount /
          (player2Stats.villageWinCount + player2Stats.villageLoseCount)) *
          100 || 0
      ).toFixed(2),
    },
    {
      team: "werewolf",
      [`win% - ${player1.username}`]: (
        (player1Stats.werewolfWinCount /
          (player1Stats.werewolfWinCount + player1Stats.werewolfLoseCount)) *
          100 || 0
      ).toFixed(2),
      [`win% - ${player2.username}`]: (
        (player2Stats.werewolfWinCount /
          (player2Stats.werewolfWinCount + player2Stats.werewolfLoseCount)) *
          100 || 0
      ).toFixed(2),
    },
    {
      team: "voting",
      [`win% - ${player1.username}`]: (
        (player1Stats.votingWinCount /
          (player1Stats.votingWinCount + player1Stats.votingLoseCount)) *
          100 || 0
      ).toFixed(2),
      [`win% - ${player2.username}`]: (
        (player2Stats.votingWinCount /
          (player2Stats.votingWinCount + player2Stats.votingLoseCount)) *
          100 || 0
      ).toFixed(2),
    },
    {
      team: "solo",
      [`win% - ${player1.username}`]: (
        (player1Stats.soloWinCount /
          (player1Stats.soloWinCount + player1Stats.soloLoseCount)) *
          100 || 0
      ).toFixed(2),
      [`win% - ${player2.username}`]: (
        (player2Stats.soloWinCount /
          (player2Stats.soloWinCount + player2Stats.soloLoseCount)) *
          100 || 0
      ).toFixed(2),
    },
    {
      team: "total",
      [`win% - ${player1.username}`]: (
        (player1Stats.totalWinCount /
          (player1Stats.totalWinCount +
            player1Stats.totalLoseCount +
            player1Stats.totalTieCount)) *
          100 || 0
      ).toFixed(2),
      [`win% - ${player2.username}`]: (
        (player2Stats.totalWinCount /
          (player2Stats.totalWinCount +
            player2Stats.totalLoseCount +
            player2Stats.totalTieCount)) *
          100 || 0
      ).toFixed(2),
    },
  ];

  const survivedPercentageData = [
    {
      key: "survived games %",
      [player1.username]: (
        (player1Stats.gamesSurvivedCount /
          (player1Stats.gamesKilledCount + player1Stats.gamesSurvivedCount)) *
        100
      ).toFixed(2),
      [player2.username]: (
        (player2Stats.gamesSurvivedCount /
          (player2Stats.gamesKilledCount + player2Stats.gamesSurvivedCount)) *
        100
      ).toFixed(2),
    },
  ];

  const playTimeData = [
    {
      key: "play time in hours",
      [player1.username]: (player1Stats.totalPlayTimeInMinutes / 60).toFixed(1),
      [player2.username]: (player2Stats.totalPlayTimeInMinutes / 60).toFixed(1),
    },
  ];

  function handleDescriptions() {
    if (player1Stats && player2Stats)
      return (
        <div className={styles.descriptions}>
          <p id="wins-by-team-description">
            Wins by team:
            {winsByTeam.map((item, index) => {
              return (
                <span key={index}>
                  {item.team}: {player1.username}{" "}
                  {item[`wins - ${player1.username}`]}; {player2.username}{" "}
                  {item[`wins - ${player2.username}`]}.
                </span>
              );
            })}
          </p>

          <p id="total-wins-description">
            Total wins: {player1.username} {totalWinsData[0][player1.username]};
            {player2.username} {totalWinsData[0][player2.username]}.
          </p>

          <p id="win%-by-team-description">
            Win percentage by team:
            {winPercentageData.map((item, index) => {
              return (
                <span key={index}>
                  {item.team}: {player1.username}{" "}
                  {item[`win% - ${player1.username}`]};{player2.username}{" "}
                  {item[`win% - ${player2.username}`]}.
                </span>
              );
            })}
          </p>

          <p id="survived-description">
            Survived games: {player1.username}{" "}
            {survidedData[0][player1.username]};{player2.username}{" "}
            {survidedData[0][player2.username]}.
          </p>

          <p id="survived%-description">
            Survived percentage:{player1.username}{" "}
            {survivedPercentageData[0][player1.username]};{player2.username}{" "}
            {survivedPercentageData[0][player2.username]}.
          </p>
          <p id="play-time-description">
            Play time in hours:{player1.username}{" "}
            {playTimeData[0][player1.username]};{player2.username}{" "}
            {playTimeData[0][player2.username]}.
          </p>
        </div>
      );
  }

  return (
    <section className={styles.comparison}>
      <Heading size="lg">
        {player1.username} x {player2.username}
      </Heading>
      <div className={styles.charts} aria-hidden>
        <ResponsiveContainer width="40%" minWidth={200} height={250}>
          <BarChart data={winsByTeam}>
            <CartesianGrid />
            <XAxis
              dataKey="team"
              stroke={
                colorMode === "dark" ? colors.fontSecondary : colors.fontMain
              }
            />
            <YAxis
              stroke={
                colorMode === "dark" ? colors.fontSecondary : colors.fontMain
              }
            />
            <Tooltip />
            <Legend />
            <Bar
              dataKey={`wins - ${player1.username}`}
              fill={colors.genderMale}
            />
            <Bar
              dataKey={`wins - ${player2.username}`}
              fill={colors.rarityCommon}
            />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="40%" minWidth={200} height={250}>
          <BarChart data={winPercentageData}>
            <CartesianGrid />
            <XAxis
              dataKey="team"
              stroke={
                colorMode === "dark" ? colors.fontSecondary : colors.fontMain
              }
            />
            <YAxis
              stroke={
                colorMode === "dark" ? colors.fontSecondary : colors.fontMain
              }
            />

            <Tooltip />
            <Legend />
            <Bar
              dataKey={`win% - ${player1.username}`}
              fill={colors.genderMale}
            />
            <Bar
              dataKey={`win% - ${player2.username}`}
              fill={colors.rarityCommon}
            />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="20%" minWidth={200} minHeight={250}>
          <BarChart data={totalWinsData}>
            <CartesianGrid />
            <XAxis
              dataKey="key"
              stroke={
                colorMode === "dark" ? colors.fontSecondary : colors.fontMain
              }
            />
            <YAxis
              stroke={
                colorMode === "dark" ? colors.fontSecondary : colors.fontMain
              }
            />
            <Tooltip />
            <Legend />
            <Bar dataKey={player1.username} fill={colors.genderMale} />
            <Bar dataKey={player2.username} fill={colors.rarityCommon} />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="20%" minWidth={200} minHeight={250}>
          <BarChart data={survidedData}>
            <CartesianGrid />
            <XAxis
              dataKey="key"
              stroke={
                colorMode === "dark" ? colors.fontSecondary : colors.fontMain
              }
            />
            <YAxis
              stroke={
                colorMode === "dark" ? colors.fontSecondary : colors.fontMain
              }
            />
            <Tooltip />
            <Legend />
            <Bar dataKey={player1.username} fill={colors.genderMale} />
            <Bar dataKey={player2.username} fill={colors.rarityCommon} />
          </BarChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="20%" minWidth={200} minHeight={250}>
          <BarChart data={survivedPercentageData}>
            <CartesianGrid />
            <XAxis
              dataKey="key"
              stroke={
                colorMode === "dark" ? colors.fontSecondary : colors.fontMain
              }
            />
            <YAxis
              stroke={
                colorMode === "dark" ? colors.fontSecondary : colors.fontMain
              }
            />
            <Tooltip />
            <Legend />
            <Bar dataKey={player1.username} fill={colors.genderMale} />
            <Bar dataKey={player2.username} fill={colors.rarityCommon} />
          </BarChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="20%" minWidth={200} minHeight={250}>
          <BarChart data={playTimeData}>
            <CartesianGrid />
            <XAxis
              dataKey="key"
              stroke={
                colorMode === "dark" ? colors.fontSecondary : colors.fontMain
              }
            />
            <YAxis
              stroke={
                colorMode === "dark" ? colors.fontSecondary : colors.fontMain
              }
            />
            <Tooltip />
            <Legend />
            <Bar dataKey={player1.username} fill={colors.genderMale} />
            <Bar dataKey={player2.username} fill={colors.rarityCommon} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {handleDescriptions()}
    </section>
  );
}
