import styled from "styled-components";
import { colors } from "../../assets/cssVariables";

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 2rem;
  background-color: ${colors.mainBrand};
  color: ${colors.mainFont};
  font-weight: bold;
  padding: 1rem;

  h2 {
    display: flex;
    gap: 0.5rem;
    border-radius: 4px;
    font-size: 1.5rem;
    padding: 0 0.5rem;
    transition: 0.3s all linear;
  }

  img {
    aspect-ratio: 1;
  }

  nav {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0 0.5rem;
    font-size: 1.25rem;
  }

  a {
    border-radius: 4px;
    padding: 0 0.5rem;
    transition: 0.25s all linear;
  }

  a:hover {
    background-color: ${colors.mainBackGround};
  }
`;
export { StyledHeader };