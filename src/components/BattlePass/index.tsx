import { ISeason } from "@/components/BattlePass/types/BattlePassSeason";
import { useAvatarItemsByIds } from "@/utils/hooks/useAvatarItemsByIds";
import { useBackground } from "@/utils/hooks/useBackground";
import Image from "next/image";
import { ErrorMessage } from "../ErrorMessage";
import { Loader } from "../Loader";
import { RewardCard } from "../RewardCard";
import styles from "./BattlePass.module.scss";

function BattlePass({
  startTime,
  durationInDays,
  number,
  rewards,
  iconUrl,
  seasonBackgroundId,
  goldPrice,
  goldPricePerReward,
  gemPricePerReward,
  xpPerReward,
}: ISeason) {
  const {
    data: background,
    isLoading,
    error,
  } = useBackground(seasonBackgroundId);

  const ids: string[] = [];

  rewards.forEach((reward) => {
    if (reward.avatarItemId) ids.push(reward.avatarItemId);
    if (reward.avatarItemIdFemale) ids.push(reward.avatarItemIdFemale);
    if (reward.avatarItemIdMale) ids.push(reward.avatarItemIdMale);
  });

  const { data: rewardsData, isLoading: rewardsLoading } =
    useAvatarItemsByIds(ids);

  if (isLoading) return <Loader />;

  if (!background || error) return <ErrorMessage />;

  const formattedStart = new Date(startTime).toLocaleDateString();

  const millisecondsOnDay = 24 * 60 * 60 * 1000;

  const endTime = new Date(
    new Date(startTime).getTime() + millisecondsOnDay * durationInDays
  );

  const timeLeft = Math.round(
    (endTime.getTime() - new Date().getTime()) / millisecondsOnDay
  );

  return (
    <div className={styles["battle-pass"]}>
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
      <div className={styles.rewards}>
        {rewardsData ? (
          <>
            <h4 className={styles["rewards-title"]}>Some of the rewards: </h4>
            <ul>
              {rewardsData.items.map((reward, index) => {
                return (
                  <li key={index}>
                    <RewardCard imageUrl={reward.imageUrl} />
                  </li>
                );
              })}
            </ul>
          </>
        ) : (
          rewardsLoading && <Loader />
        )}
      </div>
    </div>
  );
}

export { BattlePass };
