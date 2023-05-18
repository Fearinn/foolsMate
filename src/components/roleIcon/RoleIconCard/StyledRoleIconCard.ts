import styled from "styled-components";
import { colors } from "../../../assets/cssVariables";
import { IRoleIcon } from "../types/RoleIcon";

type PartialIcon = Partial<IRoleIcon>;

function handleRarity(props: PartialIcon) {
  const rarity = props.rarity;
  if (rarity === "RARE") return colors.rareRarity;
  if (rarity === "EPIC") return colors.epicRarity;
  if (rarity === "LEGENDARY") return colors.legendaryRarity;
  return colors.commonRarity;
}

export const StyledRoleIconCard = styled.div<PartialIcon>`
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
  text-transform: capitalize;
  width: 100%;

  img {
    background-color: ${colors.secondaryBackGround};
    padding: 1rem;
  }

  .text {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  p {
    width: 100%;
  }

  span {
    -webkit-text-stroke: 0.075ch ${colors.mainFont};
    text-transform: uppercase;
    font-weight: bold;
  }

  .rarity > span {
    color: ${(props: PartialIcon) => handleRarity(props)};
  }
`;
