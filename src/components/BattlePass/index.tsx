import { useBackground } from "@/utils/hooks/background";
import { useRewards } from "@/utils/hooks/battlePass";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "..";
import { ErrorMessage } from "../ErrorMessage";
import { Loader } from "../Loader";
import { RewardCard } from "../RewardCard";
import styles from "./BattlePass.module.scss";
import { Season } from "./battlePass.types";
import { Rewards } from "./Rewards";

export function BattlePass({
  startTime,
  durationInDays,
  number,
  iconUrl,
  seasonBackgroundId,
  goldPrice,
  goldPricePerReward,
  gemPricePerReward,
  xpPerReward,
}: Season) {
  const {
    data: background,
    isLoading,
    error,
  } = useBackground(seasonBackgroundId);

  const [timeLeft, setTimeLeft] = useState(durationInDays);

  const formattedStart = new Date(startTime).toLocaleDateString();

  const millisecondsOnDay = 24 * 60 * 60 * 1000;

  useEffect(() => {
    const endTime = new Date(
      new Date(startTime).getTime() + millisecondsOnDay * durationInDays
    );

    setTimeLeft(
      Math.round((endTime.getTime() - new Date().getTime()) / millisecondsOnDay)
    );
  }, [durationInDays, millisecondsOnDay, startTime]);

  if (isLoading) return <Loader />;

  if (!background || error) return <ErrorMessage />;

  return (
    <section className={styles["battle-pass"]}>
      <div className={styles["bg-info-container"]}>
        <div className={styles.info}>
          <h3 className={styles["battle-pass-title"]}>
            Battle Pass - Season {number}
          </h3>
          <Image
            className={styles.icon}
            src={iconUrl}
            alt=""
            role="presentation"
            width={100}
            height={100}
          />
          <time>
            Start: <span>{formattedStart}</span>
          </time>
          <p>
            Duration: <span>{durationInDays} days</span>
          </p>
          <p>
            Time left: <span>{timeLeft} days</span>
          </p>
          <p>
            Gold price: <span>{goldPrice} </span>
          </p>
          <p>
            Gold price per reward: <span>{goldPricePerReward} </span>
          </p>
          <p>
            Gem price per reward: <span>{gemPricePerReward} </span>
          </p>
          <p>
            xp per reward: <span>{xpPerReward} </span>
          </p>
        </div>
        <div className={styles.bgs}>
          <Image
            className={styles.bg}
            src={background.imageDayWide.url}
            alt=""
            role="presentation"
            width={background.imageDayWide.width}
            height={background.imageDayWide.height}
            style={{ backgroundColor: `${background.backgroundColorDay}` }}
            priority
          />
          <Image
            className={styles.bg}
            src={background.imageNightWide.url}
            alt=""
            role="presentation"
            width={background.imageNightWide.width}
            height={background.imageNightWide.height}
            style={{ backgroundColor: `${background.backgroundColorNight}` }}
            priority
          />
        </div>
      </div>
      <Rewards />
    </section>
  );
}
