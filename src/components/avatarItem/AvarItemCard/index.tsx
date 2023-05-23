import classNames from "classnames";
import Image from "next/image";
import { memo } from "react";
import { AvatarItem } from "../types/AvatarItem";
import styles from "./AvatarItemCard.module.scss";

function AvatarItemCard(props: AvatarItem) {
  function cost() {
    if (props.costInGold) return `${props.costInGold} gold`;
    if (props.costInRoses) return `${props.costInRoses} roses`;
    return "?";
  }

  return (
    <div className={styles["avatar-item-card"]}>
      <Image
        src={props.imageUrl}
        alt=""
        role="presentation"
        width={100}
        height={50}
      />
      <div className={styles.text}>
        <p className={styles.cost}>
          Cost:{" "}
          <span
            className={classNames({
              [styles.gold]: props.costInGold,
              [styles.roses]: props.costInRoses,
            })}
          >
            {cost()}
          </span>
        </p>
        <p className={styles.gender}>
          Gender: <span className={styles[props.gender]}>{props.gender}</span>
        </p>
        <p className={styles.type}>
          Type: <span>{props.type || "?"}</span>
        </p>
        <p className={styles.rarity}>
          Rarity:{" "}
          <span className={styles[props.rarity]}>{props.rarity || "?"}</span>
        </p>
        <p className={styles.event}>
          Event: <span>{props.event?.replaceAll("_", " ") || "NONE"}</span>
        </p>
      </div>
    </div>
  );
}

const memoizedExport = memo(AvatarItemCard);

export { memoizedExport as AvatarItemCard };
