import { ISeason } from "../../types/BattlePassSeason";
import { useAvatarItemsByIds } from "../../utils/hooks/useAvatarItemsByIds";
import { useBackground } from "../../utils/hooks/useBackground";
import { ErrorMessage } from "../ErrorMessage";
import { Loader } from "../Loader";
import { RewardCard } from "../RewardCard";
import { StyledBattlePass } from "./StyledBattlePass";

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

  return (
    <StyledBattlePass>
      <div className="bg-info-container">
        <div className="info">
          <h3 className="battlepass-title">Battle Pass - Season {number}</h3>
          <img
            className="icon"
            src={iconUrl}
            alt=""
            role="presentation"
            width={100}
            height={100}
          />
          <time>
            Start: <span>{new Date(startTime).toLocaleString()}</span>
          </time>
          <p>
            Duration: <span>{durationInDays} days</span>
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
        <div className="bgs">
          <img
            className="bg"
            src={background.imageDayWide.url}
            alt=""
            role="presentation"
            width={background.imageDayWide.width}
            height={background.imageDayWide.height}
            style={{ backgroundColor: `${background.backgroundColorDay}` }}
          />
          <img
            className="bg"
            src={background.imageNightWide.url}
            alt=""
            role="presentation"
            width={background.imageNightWide.width}
            height={background.imageNightWide.height}
            style={{ backgroundColor: `${background.backgroundColorNight}` }}
          />
        </div>
      </div>
      <div className="rewards">
        {rewardsData ? (
          <>
            <h4 className="rewards-title">Some of the rewards: </h4>
            <ul>
              {rewardsData.slice(0, 25).map((reward, index) => {
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
    </StyledBattlePass>
  );
}

export { BattlePass };
