import styled from "styled-components";
import { colors } from "../../assets/cssVariables";

export const StyledRewardCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  justify-content: space-around;
  background-color: ${colors.secondaryFont};
  border: 3px solid ${colors.tertiaryBackground};
  border-radius: 8px;
  height: 100%;
  padding: 0.5rem;
  width: 100%;

  img {
    background-color: ${colors.secondaryBackGround};
    padding: 0.5rem;
  }

  .info {
    display: flex;
    gap: 0.5rem;
  }
`;
