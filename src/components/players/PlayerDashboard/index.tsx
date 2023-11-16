/* eslint-disable @next/next/no-img-element */
import { ErrorMessage } from "@/components/ErrorMessage";
import { Loader } from "@/components/Loader";
import { useBackground } from "@/utils/hooks/background";
import { useBattlePassSeason } from "@/utils/hooks/battlePass";
import { timeDifference } from "@/utils/formatDate";
import { Heading, useColorMode } from "@chakra-ui/react";
import Image from "next/image";
import { memo } from "react";
import { GameStatsChart } from "../GameStatsCharts";
import { Avatar, Player } from "../players.types";
import styles from "./PlayerDashboard.module.scss";

function PlayerDashboard(props: Player) {
  const accountCreation = props.creationTime
    ? Intl.DateTimeFormat(undefined, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(new Date(props.creationTime))
    : "UNAVAILABLE";

  const formattedLastOnline = timeDifference(new Date(props.lastOnline));

  const {
    data: bp,
    isLoading: bpIsLoading,
    error: bpError,
  } = useBattlePassSeason();

  const { data, isLoading, error } = useBackground(
    bp?.seasonBackgroundId || "RnB"
  );

  const { colorMode } = useColorMode();

  function handleEquippedAvatar() {
    if (bpIsLoading || isLoading) return <Loader />;

    if (bpError || error) return <ErrorMessage />;

    return (
      <div
        className={styles["img-container"]}
        style={{ backgroundColor: data.backgroundColorDay }}
      >
        <Image
          className={styles["img-bg"]}
          alt=""
          role="presentation"
          height={
            colorMode === "light"
              ? data.imageDaySmall.height
              : data.imageNightSmall.height
          }
          width={
            colorMode === "light"
              ? data.imageDaySmall.width
              : data.imageNightSmall.width
          }
          src={
            colorMode === "light"
              ? data.imageDaySmall.url
              : data.imageNightSmall.url
          }
        />
        <img
          className={styles.avatar}
          role="presentation"
          alt=""
          src={props.equippedAvatar.url.replace(".png", "@2x.png")}
          width={props.equippedAvatar.width}
          height={props.equippedAvatar.height}
        />
      </div>
    );
  }

  function handleOtherAvatar(avatar: Avatar, key: number | string) {
    if (bpIsLoading || isLoading) return <Loader key={key} />;

    if (bpError || error) return <></>;

    return (
      <div
        key={key}
        className={styles["img-container"]}
        style={{ backgroundColor: data.backgroundColorDay }}
      >
        <Image
          className={styles["img-bg"]}
          alt=""
          role="presentation"
          height={
            colorMode === "light"
              ? data.imageDaySmall.height
              : data.imageNightSmall.height
          }
          width={
            colorMode === "light"
              ? data.imageDaySmall.width
              : data.imageNightSmall.width
          }
          src={
            colorMode === "light"
              ? data.imageDaySmall.url
              : data.imageNightSmall.url
          }
        />
        <img
          className={styles.avatar}
          role="presentation"
          alt=""
          src={avatar.url.replace(".png", "@2x.png")}
          width={avatar.width}
          height={avatar.height}
        />
      </div>
    );
  }

  return (
    <div className={styles["player-dashboard"]} aria-live="polite">
      <section className={styles.profile}>
        <div className={styles.container}>
          <div className={styles.summary}>
            <Heading size="md">{props.username}</Heading>
            {handleEquippedAvatar()}
            <p>
              Level: <span>{props.level}</span>
            </p>
            <p>
              Status: <span>{props.status}</span>
            </p>
          </div>
          <ul className={styles.avatars}>
            {props.avatars &&
              props.avatars.map((avatar, index) => {
                return (
                  avatar.url !== props.equippedAvatar.url &&
                  handleOtherAvatar(avatar, index)
                );
              })}
          </ul>
        </div>
        <div className={styles.details}>
          <p>
            Last online:{" "}
            <time dateTime="">
              <span>{formattedLastOnline}</span>
            </time>
          </p>
          <p>
            Account creation:{" "}
            <time>
              <span>{accountCreation}</span>
            </time>
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
          {props.username}&apos;s game stats are private or unavailable
        </ErrorMessage>
      )}
    </div>
  );
}

const memoizedExport = memo(PlayerDashboard);

export { memoizedExport as PlayerDashboard };
