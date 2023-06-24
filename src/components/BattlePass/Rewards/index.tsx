import { Button, ErrorMessage, Loader, RewardCard } from "@/components";
import { useRewards } from "@/utils/hooks/battlePass";
import { useState } from "react";
import styles from "./Rewards.module.scss";

export function Rewards() {
  const { data, isLoading } = useRewards();
  const [rewardsOpen, setRewardsOpen] = useState(false);

  return (
    <div className={styles.rewards}>
      {data ? (
        <>
          <Button
            width="fit-content"
            onClick={() => setRewardsOpen(!rewardsOpen)}
            aria-expanded={rewardsOpen}
            aria-controls="rewards-list"
          >
            {rewardsOpen ? "Hide" : "Show"} some of the rewards
          </Button>
          <ul id="rewards-list">
            {rewardsOpen &&
              data.map((reward, index) => {
                return (
                  reward.item && (
                    <li key={index}>
                      <RewardCard {...reward} />
                    </li>
                  )
                );
              })}
          </ul>
        </>
      ) : isLoading ? (
        <Loader />
      ) : (
        <ErrorMessage />
      )}
    </div>
  );
}
