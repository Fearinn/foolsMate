import { colors } from "@/assets/cssVariables";
import { Button } from "@/components/Button";
import { Heading, useColorMode } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import styles from "./Header.module.scss";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const { colorMode, toggleColorMode } = useColorMode();

  const iconStyles = {
    size: 24,
    color: colorMode === "light" ? colors.fontMain : colors.dark.fontMain,
  };

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
      <Button
        role="switch"
        aria-checked={colorMode !== "light"}
        aria-label="dark mode"
        title="color mode"
        className={styles["color-mode"]}
        onClick={toggleColorMode}
      >
        {colorMode === "light" ? (
          <BsMoonFill {...iconStyles} />
        ) : (
          <BsSunFill {...iconStyles} />
        )}
      </Button>
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
