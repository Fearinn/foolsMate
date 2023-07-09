import { colors } from "@/assets/cssVariables";
import classNames from "classnames";
import Image from "next/image";
import { memo, useEffect } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { AvatarItem } from "../avatarItems.types";
import styles from "./AvatarItemCard.module.scss";

type Props = {
  addFavorite: (value: string) => void;
  removeFavorite: (value: string) => void;
  isFavorite: boolean;
} & AvatarItem;

const iconsStyles = {
  color: colors.brandMain,
  size: 28,
};

function AvatarItemCard(props: Props) {
  function cost() {
    if (props.costInGold) return `${props.costInGold} gold`;
    if (props.costInRoses) return `${props.costInRoses} roses`;
    return "UNDEFINED";
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
      <button
        aria-label={`favorite icon ${props.id}`}
        aria-pressed={props.isFavorite}
        type="button"
        className={styles.favorite}
        onClick={() => {
          if (props.isFavorite) {
            props.removeFavorite(props.id);
            return;
          }

          props.addFavorite(props.id);
        }}
      >
        {props.isFavorite ? (
          <AiFillStar title="unfavorite" {...iconsStyles} />
        ) : (
          <AiOutlineStar title="favorite" {...iconsStyles} />
        )}
      </button>

      <div className={styles.text}>
        <p>
          Id: <span className={styles.id}>{props.id}</span>
        </p>
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
