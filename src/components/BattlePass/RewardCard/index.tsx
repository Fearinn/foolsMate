import classNames from "classnames";
import Image from "next/image";
import { Reward } from "../battlePass.types";
import styles from "./RewardCard.module.scss";

function RewardCard({ item, type, free, amount }: Reward) {
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
        <div className={styles.info}>
          <p>
            Type:{" "}
            <span className={styles[type]}>{type.replaceAll("_", " ")}</span>
          </p>
          <p>
            Free:{" "}
            <span
              className={classNames({
                [styles.free]: free,
                [styles["not-free"]]: !free,
              })}
            >
              {free ? "YES" : "NO"}
            </span>
          </p>
          <p>
            Amount: <span className={styles.amount}>{amount}</span>
          </p>
        </div>
      </div>
    )
  );
}

export { RewardCard };
