import styled from "styled-components";
import { colors } from "../../../assets/cssVariables";
import IAvatarItem from "../../../types/AvatarItem";

function handleGender(props: IAvatarItem) {
  const gender = props.gender;
  if (gender === "MALE") return colors.maleGender;
  if (gender === "FEMALE") return colors.femaleGender;
  return colors.neutralGender;
}

function handleRarity(props: IAvatarItem) {
  const rarity = props.rarity;
  if (rarity === "RARE") return colors.rareRarity;
  if (rarity === "EPIC") return colors.epicRarity;
  if (rarity === "LEGENDARY") return colors.legendaryRarity;
  return colors.commonRarity;
}

const StyledAvatarItemCard = styled.div<IAvatarItem>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  justify-content: space-around;
  background-color: ${colors.secondaryFont};
  border: 3px solid ${colors.tertiaryBackground};
  border-radius: 8px;
  cursor: pointer;
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

  .cost > span {
    color: ${(props: IAvatarItem) => props.costInGold ? colors.costInGold : colors.costInRoses};
  }

  .gender > span {
    color: ${(props: IAvatarItem) => handleGender(props)};
  }

  .type > span {
    color: ${colors.itemType}
  }

  .rarity > span {
    color: ${(props: IAvatarItem) => handleRarity(props)};
  }
`;

export default StyledAvatarItemCard;
