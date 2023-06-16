import { Heading } from "@chakra-ui/react";
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
import { GameStats } from "../players.types";
import styles from "./GameStatsCharts.module.scss";

function GameStatsChart(props: GameStats) {
  const teamData = [
    {
      team: "village",
      wins: props.villageWinCount,
      losses: props.villageLoseCount,
    },
    {
      team: "werewolf",
      wins: props.werewolfWinCount,
      losses: props.werewolfLoseCount,
    },
    {
      team: "solo",
      wins: props.soloWinCount,
      losses: props.soloLoseCount,
    },
    {
      team: "voting",
      wins: props.votingWinCount,
      losses: props.votingLoseCount,
    },
  ];

  const totalData = [
    {
      name: "total",
      wins: props.totalWinCount,
      losses: props.totalLoseCount,
      ties: props.totalTieCount,
    },
  ];

  const survivedData = [
    {
      name: "survived games",
      yes: props.gamesSurvivedCount,
      no: props.gamesKilledCount,
    },
  ];

  const percentageData = [
    {
      name: "win%",
      village: (
        (props.villageWinCount /
          (props.villageWinCount + props.villageLoseCount)) *
          100 || 0
      ).toFixed(2),
      werewolf: (
        (props.werewolfWinCount /
          (props.werewolfWinCount + props.werewolfLoseCount)) *
          100 || 0
      ).toFixed(2),
      solo: (
        (props.soloWinCount / (props.soloWinCount + props.soloLoseCount)) *
          100 || 0
      ).toFixed(2),
      voting: (
        (props.votingWinCount /
          (props.votingWinCount + props.votingLoseCount)) *
          100 || 0
      ).toFixed(2),
      total: (
        (props.totalWinCount /
          (props.totalWinCount + props.totalLoseCount + props.totalTieCount)) *
          100 || 0
      ).toFixed(2),
    },
  ];

  function handleDescriptions() {
    const percentageKeys = Object.keys(percentageData[0]).filter(
      (key) => key !== "name"
    );

    return (
      <div className={styles.descriptions}>
        <p id="team-wins-description" className={styles.description}>
          Wins and losses by teams:{" "}
          {teamData.map((item, index) => {
            return (
              <span key={index}>
                {item.team}: {item.wins} wins and {item.losses} losses{" "}
              </span>
            );
          })}
        </p>

        <p id="total-wins-description" className={styles.description}>
          Total wins and losses: {totalData[0].wins} wins and{" "}
          {totalData[0].losses} losses
        </p>

        <p id="team-win%-description" className={styles.description}>
          Win percentage by team:{" "}
          {percentageKeys.map((team, index) => {
            return (
              <span key={index}>
                {team}:{" "}
                {percentageData[0][team as keyof (typeof percentageData)[0]]}{" "}
              </span>
            );
          })}
        </p>

        <p id="survived-description" className={styles.description}>
          Survived games: {survivedData[0].yes} yes, {survivedData[0].no} no
        </p>
      </div>
    );
  }

  return (
    <section className={styles.container}>
      <Heading as="h3" size="md">
        Game stats
      </Heading>
      <div className={styles.charts} aria-hidden>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={teamData}>
            <CartesianGrid />
            <XAxis dataKey="team" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="wins" fill="#116D6E" />
            <Bar dataKey="losses" fill="#CD1818" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="50%" height={250}>
          <BarChart data={totalData}>
            <CartesianGrid />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="wins" fill="#116D6E" />
            <Bar dataKey="losses" fill="#CD1818" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={percentageData}>
            <CartesianGrid />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="village" fill="#116D6E" />
            <Bar dataKey="werewolf" fill="#CD1818" />
            <Bar dataKey="solo" fill="orange" />
            <Bar dataKey="voting" fill="purple" />
            <Bar dataKey="total" fill="black" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="50%" height={250}>
          <BarChart data={survivedData}>
            <CartesianGrid />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="yes" fill="#116D6E" />
            <Bar dataKey="no" fill="#CD1818" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {handleDescriptions()}
    </section>
  );
}

export { GameStatsChart };
