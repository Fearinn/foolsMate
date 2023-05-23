import Image from "next/image";
import { RoleIcon } from "../types/RoleIcon";
import styles from "./RoleIconCard.module.scss";

function RoleIconCard({ image, roleId, event, rarity }: RoleIcon) {
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
      <div className={styles.text}>
        <p className={styles.rarity}>
          Rarity: <span className={styles[rarity]}>{rarity}</span>
        </p>
        <p>
          Role: <span>{roleId.toString()}</span>
        </p>
        <p>
          Event: <span>{event?.toString() || "NONE"}</span>
        </p>
      </div>
    </div>
  );
}

export { RoleIconCard };
