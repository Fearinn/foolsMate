import { colors } from "@/assets/cssVariables";
import Image from "next/image";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { RoleIcon } from "../roleIcons.types";
import styles from "./RoleIconCard.module.scss";

type Props = {
  addFavorite: (value: string) => void;
  removeFavorite: (value: string) => void;
  isFavorite: boolean;
} & RoleIcon;

const iconsStyles = {
  color: colors.brandMain,
  size: 28,
};

function RoleIconCard({
  id,
  image,
  roleId,
  event,
  rarity,
  isFavorite,
  removeFavorite,
  addFavorite,
}: Props) {
  return (
    <div className={styles["role-icon-card"]}>
      <Image
        className={styles.image}
        alt=""
        role="presentation"
        src={image.url}
        width={image.width}
        height={image.height}
      ></Image>
      {isFavorite ? (
        <button
          aria-label={`unfavorite item ${id} `}
          type="button"
          className={styles.favorite}
          onClick={() => removeFavorite(id)}
        >
          <AiFillStar title="unfavorite" {...iconsStyles} />
        </button>
      ) : (
        <button
          aria-label={`favorite item ${id}`}
          type="button"
          className={styles.favorite}
          onClick={() => addFavorite(id)}
        >
          <AiOutlineStar title="favorite" {...iconsStyles} />
        </button>
      )}
      <div className={styles.text}>
        <p>
          Id: <span className={styles.id}>{id}</span>
        </p>
        <p className={styles.rarity}>
          Rarity: <span className={styles[rarity]}>{rarity}</span>
        </p>
        <p>
          Role: <span>{roleId.toString().replaceAll("-", " ")}</span>
        </p>
        <p>
          Event: <span>{event?.toString().replaceAll("_", " ") || "NONE"}</span>
        </p>
      </div>
    </div>
  );
}

const memoizedExport = RoleIconCard;

export { memoizedExport as RoleIconCard };

