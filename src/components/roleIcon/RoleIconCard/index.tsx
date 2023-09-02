import { colors } from "@/assets/cssVariables";
import { useColorMode } from "@chakra-ui/react";
import Image from "next/image";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { RoleIcon } from "../roleIcons.types";
import styles from "./RoleIconCard.module.scss";

type Props = {
  index: number;
  addFavorite: (value: string) => void;
  removeFavorite: (value: string) => void;
  isFavorite: boolean;
} & RoleIcon;

function RoleIconCard({
  id,
  image,
  roleId,
  event,
  rarity,
  isFavorite,
  removeFavorite,
  addFavorite,
  index,
}: Props) {
  const { colorMode } = useColorMode();

  const iconsStyles = {
    color: colorMode === "light" ? colors.brandMain : colors.dark.fontMain,
    size: 28,
  };

  return (
    <div className={styles["role-icon-card"]}>
      <img
        decoding={index > 14 ? "async" : undefined}
        loading={index > 14 ? "lazy" : "eager"}
        className={styles.image}
        alt=""
        role="presentation"
        src={image.url}
        width={image.width}
        height={image.height}
      ></img>

      <button
        aria-label={`favorite icon ${id}`}
        aria-pressed={isFavorite}
        type="button"
        className={styles.favorite}
        onClick={() => {
          if (isFavorite) {
            removeFavorite(id);
            return;
          }

          addFavorite(id);
        }}
      >
        {isFavorite ? (
          <AiFillStar title="unfavorite" {...iconsStyles} />
        ) : (
          <AiOutlineStar title="favorite" {...iconsStyles} />
        )}
      </button>
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
