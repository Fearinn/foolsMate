import styled from "styled-components";
import { colors } from "../../assets/cssVariables";

const StyledAvatarItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  .filters {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 0.5rem;
  }

  .stats {
    display: flex;
    gap: 1rem;
    
    p {
      border: 2px solid ${colors.mainBrand};
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
    background-color: #efefef;
    font-size: 1.125rem;
    padding: 1rem;
    width: 100%;

    li {
      width: 100%;
    }
  }
`;

export default StyledAvatarItemList;
