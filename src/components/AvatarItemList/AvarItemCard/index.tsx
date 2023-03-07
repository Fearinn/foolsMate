import IAvatarItem from "../../../types/AvatarItem";
import StyledAvatarItemCard from "./StyledAvatarItemCard";

function AvatarItemCard(props: IAvatarItem) {
  return (
    <StyledAvatarItemCard {...props}>
      <img src={props.imageUrl} alt="" role="presentation" />
      <div className="text">
        <p className="cost">
          Cost: <span>{props.costInGold || props.costInRoses || "?"}</span>
        </p>
        <p className="gender">
          Gender: <span>{props.gender || "BOTH"}</span>
        </p>
        <p className="type">
          Type: <span>{props.type || "?"}</span>
        </p>
        <p className="rarity">
          Rarity: <span>{props.rarity || "?"}</span>
        </p>
        <p className="event">Event: <span>{props.event?.replaceAll("_", " ") || "NONE"}</span></p>
      </div>
    </StyledAvatarItemCard>
  );
}

export default AvatarItemCard;
