/* eslint-disable @next/next/no-img-element */
import { ErrorMessage } from "@/components/ErrorMessage";
import { Heading } from "@chakra-ui/react";
import { memo } from "react";
import { GameStatsChart } from "../GameStatsCharts";
import { Player } from "../players.types";
import styles from "./PlayerDashboard.module.scss";

function PlayerDashboard(props: Player) {
  const accountCreation = props.creationTime
    ? Intl.DateTimeFormat(undefined, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(new Date(props.creationTime))
    : "UNAVAILABLE";

  return (
    <div className={styles["player-dashboard"]} aria-live="polite">
      <section className={styles.profile}>
        <div className={styles.container}>
          <div className={styles.summary}>
            <Heading size="md">{props.username}</Heading>
            <img
              role="presentation"
              alt=""
              src={props.equippedAvatar.url}
              width={props.equippedAvatar.width}
              height={props.equippedAvatar.height}
            />
            <p>
              Level: <span>{props.level}</span>
            </p>
            <p>
              Status: <span>{props.status}</span>
            </p>
          </div>
          <div className={styles.avatars}>
            {props.avatars &&
              props.avatars.map((avatar, index) => {
                return (
                  avatar.url !== props.equippedAvatar.url && (
                    <img
                      key={index}
                      role="presentation"
                      alt=""
                      src={avatar.url}
                      height={avatar.height}
                      width={avatar.width}
                    />
                  )
                );
              })}
          </div>
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
            Total hours played:{" "}
            <span>
              {props.gameStats
                ? (props.gameStats.totalPlayTimeInMinutes / 60).toFixed(2)
                : "UNAVAILABLE"}
            </span>
          </p>
        </div>
      </section>
      {props.gameStats ? (
        <GameStatsChart {...props.gameStats} />
      ) : (
        <ErrorMessage>
          {props.username}
          {"'"}s game stats are private or unavailable
        </ErrorMessage>
      )}
    </div>
  );
}

const memoizedExport = memo(PlayerDashboard);

export { memoizedExport as PlayerDashboard };
