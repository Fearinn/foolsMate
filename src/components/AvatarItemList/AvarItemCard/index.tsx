import IAvatarItem from "../../../types/AvatarItem";
import StyledAvatarItemCard from "./StyledAvatarItemCard";

function AvatarItemCard(props: IAvatarItem) {
  return (
    <StyledAvatarItemCard {...props}>
      <img src={props.imageUrl} alt="" role="presentation" />
      <div className="text">
        <p className="cost">
          Cost in gold: <span>{props.costInGold || "?"}</span>
        </p>
        <p className="gender">
          Gender: <span>{props.gender || "NEUTRAL"}</span>
        </p>
        <p className="type">
          Type: <span>{props.type || "?"}</span>
        </p>
        <p className="rarity">
          Rarity: <span>{props.rarity || "?"}</span>
        </p>
      </div>
    </StyledAvatarItemCard>
  );
}

export default AvatarItemCard;
