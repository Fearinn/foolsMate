import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.scss";

function Header() {
  return (
    <header className={styles.header}>
      <Link href="/">
        <h2>
          <Image
            alt=""
            src="/joker.svg"
            role="presentation"
            width="42"
            height="42"
          ></Image>
          {"Fool's Mate"}
        </h2>
      </Link>
      <nav className={styles["main-menu"]}>
        <Link href="/players">Players</Link>
        <Link href="/items/avatarItems">Avatar Items</Link>
        <Link href="/items/roleIcons">Role Icons</Link>
      </nav>
    </header>
  );
}

export { Header };
