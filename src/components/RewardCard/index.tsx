import Image from "next/image";
import { Reward } from "../BattlePass/battlePass.types";
import styles from "./RewardCard.module.scss";

function RewardCard({ item }: Reward) {
  return (
    item && (
      <div className={styles["reward-card"]}>
        <Image
          className={styles.image}
          src={item.image.url}
          alt=""
          role="presentation"
          width={item.image.width}
          height={item.image.height}
        />
      </div>
    )
  );
}

export { RewardCard };

