import { Link } from "react-router-dom";
import { StyledHeader } from "./StyledHeader";

function Header() {
  return (
    <StyledHeader>
      <nav>
        <h1>
          <Link to="/">Wolvesville Wiki</Link>
        </h1>
        <Link to="items/avatarItems">Items</Link>
      </nav>
    </StyledHeader>
  );
}

export { Header };
