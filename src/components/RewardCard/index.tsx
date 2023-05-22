import Image from "next/image";
import styles from "./RewardCard.module.scss";

function RewardCard({ imageUrl }: { imageUrl: string }) {
  return (
    <div className={styles["reward-card"]}>
      <Image
        className={styles.image}
        src={imageUrl}
        alt=""
        role="presentation"
        width={100}
        height={50}
      />
    </div>
  );
}

export { RewardCard };
