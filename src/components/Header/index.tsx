import Image from "next/image";
import Link from "next/link";
import { StyledHeader } from "./StyledHeader";

function Header() {
  return (
    <StyledHeader>
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
      </nav>
    </StyledHeader>
  );
}

export { Header };
