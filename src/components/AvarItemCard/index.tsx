import Image from "next/image";
import { memo } from "react";
import { IAvatarItem } from "../../types/AvatarItem";
import { StyledAvatarItemCard } from "./StyledAvatarItemCard";

function AvatarItemCard(props: IAvatarItem) {
  function cost() {
    if (props.costInGold) return `${props.costInGold} gold`;
    if (props.costInRoses) return `${props.costInRoses} roses`;
    return "?";
  }
  return (
    <StyledAvatarItemCard {...props}>
      <Image
        src={props.imageUrl}
        alt=""
        role="presentation"
        width={100}
        height={100}
      />
      <div className="text">
        <p className="cost">
          Cost: <span>{cost()}</span>
        </p>
        <p className="gender">
          Gender: <span>{props.gender}</span>
        </p>
        <p className="type">
          Type: <span>{props.type || "?"}</span>
        </p>
        <p className="rarity">
          Rarity: <span>{props.rarity || "?"}</span>
        </p>
        <p className="event">
          Event: <span>{props.event?.replaceAll("_", " ") || "NONE"}</span>
        </p>
      </div>
    </StyledAvatarItemCard>
  );
}

const memoizedExport = memo(AvatarItemCard);

export { memoizedExport as AvatarItemCard };
