import classNames from "classnames";
import { Reward } from "../battlePass.types";
import styles from "./RewardCard.module.scss";

function RewardCard({ item, type, free, amount }: Reward) {
  return (
    item && (
      <div className={styles["reward-card"]}>
        <img
          decoding="async"
          loading="lazy"
          className={styles.image}
          src={item.image.url.replace(".png", "@2x.png")}
          alt=""
          role="presentation"
          width={item.image.width}
          height={item.image.height}
        />
        <div className={styles.info}>
          <p>
            Id: <span>{item.id}</span>
          </p>
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

