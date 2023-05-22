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
            src="/favicon.svg"
            role="presentation"
            width="24"
            height="24"
          ></Image>
          Wolvesville Wiki
        </h2>
      </Link>
      <nav>
        <Link href="/items/avatarItems">Avatar Items</Link>
        <Link href="/items/roleIcons">Role Icons</Link>
      </nav>
    </header>
  );
}

export { Header };
