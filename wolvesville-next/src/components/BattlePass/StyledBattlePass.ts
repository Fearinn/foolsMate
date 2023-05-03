import styled from "styled-components";
import { colors } from "../../assets/cssVariables";

export const StyledBattlePass = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background-color: ${colors.secondaryBackGround};
  gap: 0.5rem;
  padding: 1rem;
  width: 100%;

  .battlepass-title {
    font-size: 1.125rem;
    font-weight: bold;
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    background-color: ${colors.mainBackGround};
    border-radius: 8px;
    font-size: 1.125rem;
    padding: 0.5rem;

    .icon {
      align-self: center;
    }

    span {
      font-weight: bold;
    }
  }

  .bg-info-container {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
  }

  .bgs {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 0.5rem;
    width: 100%;

    .bg {
      margin: 0 auto;
      max-width: 800px;
      width: 100%;
    }
  }

  .rewards {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0.5rem;
    width: 100%;

    &-title {
      font-size: 1.125rem;
      font-weight: bold;
    }

    ul {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }
  }

  @media screen and (max-width: 1440px) {
    .bg-info-container {
      align-items: center;
    }
  }

  @media screen and (max-width: 768px) {
    .bg-info-container {
      flex-direction: column;
    }

    .info {
      align-items: center;
      width: 100%;
    }
  }
`;