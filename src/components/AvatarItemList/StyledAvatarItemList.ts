import styled from "styled-components";
import { colors } from "../../assets/cssVariables";

const StyledAvatarItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  .stats {
    display: flex;
    gap: 1rem;
    
    p {
      background-color: ${colors.mainBackGround};
      border: 2px solid ${colors.tertiaryBackground};
      border-radius: 8px;
      padding: 0.5rem;
    }

    span {
      font-weight: bold;
    }
  }

  ul {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    align-items: stretch;
    gap: 0.5rem;
    background-color: ${colors.secondaryBackGround};
    font-size: 1.125rem;
    padding: 1rem;
    width: 100%;

    li {
      width: 100%;
    }
  }
`;

export default StyledAvatarItemList;
