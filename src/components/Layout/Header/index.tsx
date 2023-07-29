import { Button } from "@/components/Button";
import { Heading } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.scss";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

const iconStyles = {
  size: 24,
};

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={styles.header}>
      <Link className={styles.logo} href="/">
        <Image
          alt=""
          src="/favicon.svg"
          role="presentation"
          width="42"
          height="42"
        ></Image>
        <Heading size="lg">{"Fool's Mate"}</Heading>
      </Link>
      <div className={styles["popup-menu-container"]}>
        <Button
          aria-haspopup="menu"
          aria-controls="main-menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          <GiHamburgerMenu {...iconStyles} />
        </Button>
        <nav
          className={styles["main-menu"] + " " + styles["popup-menu"]}
          id="main-menu"
        >
          {isOpen && (
            <>
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
            </>
          )}
        </nav>
      </div>
      <nav
        className={styles["main-menu"] + " " + styles["static-menu"]}
        id="main-menu"
      >
        <>
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
        </>
      </nav>
    </header>
  );
}
