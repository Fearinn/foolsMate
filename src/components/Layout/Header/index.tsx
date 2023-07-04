import { Heading } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.scss";

function Header() {
  return (
    <header className={styles.header}>
      <Link className={styles.logo} href="/">
        <Image
          alt=""
          src="/joker.svg"
          role="presentation"
          width="42"
          height="42"
        ></Image>
        <Heading size="lg">{"Fool's Mate"}</Heading>
      </Link>
      <nav className={styles["main-menu"]}>
        <Link href="/players">Players</Link>
        <Link href="/roles">Roles</Link>
        <Link href="/items/avatarItems">Avatar Items</Link>
        <Link href="/items/roleIcons">Role Icons</Link>
        <Link
          href="https://www.wolvesville.com"
          target="_blank"
          className={styles.game}
        >
          Play
        </Link>
      </nav>
    </header>
  );
}

export { Header };

