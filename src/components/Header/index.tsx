import { Link } from "react-router-dom";
import { StyledHeader } from "./StyledHeader";

function Header() {
  return (
    <StyledHeader>
      <Link to="/">
        <h2>
          <img
            src="/paw-3-svgrepo-com.svg"
            role="presentation"
            width="24"
            height="24"
          ></img>
          Wolvesville Wiki
        </h2>
      </Link>
      <nav>
        <Link to="items/avatarItems">Items</Link>
      </nav>
    </StyledHeader>
  );
}

export { Header };
