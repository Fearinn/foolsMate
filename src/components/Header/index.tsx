import { Link } from "react-router-dom";
import Search from "../Search";
import StyledHeader from "./StyledHeader";

export function Header() {
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
