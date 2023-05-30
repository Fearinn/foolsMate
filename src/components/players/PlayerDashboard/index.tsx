import { Heading } from "@chakra-ui/react";
import Image from "next/image";
import { GameStatsChart } from "../GameStatsCharts";
import { Player } from "../players.types";
import styles from "./PlayerDashboard.module.scss";

export function PlayerDashboard(props: Player) {
  const accountCreation = props.creationTime
    ? Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(
        new Date(props.creationTime)
      )
    : "UNAVAILABLE";

  return (
    <div className={styles["player-dashboard"]}>
      <div className={styles.profile}>
        <div className={styles.summary}>
          <Heading size="md">{props.username}</Heading>
          <Image
            role="presentation"
            alt=""
            src={props.equippedAvatar.url}
            width={props.equippedAvatar.width}
            height={props.equippedAvatar.height}
            priority
          />
          <p>
            Level: <span>{props.level}</span>
          </p>
        </div>
        <div className={styles.details}>
          <p>
            Account creation: <span>{accountCreation}</span>
          </p>
          <p>
            Best rank in ranked:{" "}
            <span>{props.rankedSeasonBestRank || "UNAVAILABLE"}</span>
          </p>
          <p>
            Best SP in ranked:{" "}
            <span>{props.rankedSeasonMaxSkill || "UNAVAILABLE"}</span>
          </p>
          <p>
            Ranked seasons played:{" "}
            <span>{props.rankedSeasonPlayedCount || "UNAVAILABLE"}</span>
          </p>
          <p>
            Total minutes played:{" "}
            <span>
              {props.gameStats?.totalPlayTimeInMinutes || "UNAVAILABLE"}
            </span>
          </p>
        </div>
      </div>
      {props.gameStats && <GameStatsChart {...props.gameStats} />}
    </div>
  );
}