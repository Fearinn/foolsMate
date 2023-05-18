import Image from "next/image";
import { IRoleIcon } from "../types/RoleIcon";
import { StyledRoleIconCard } from "./StyledRoleIconCard";

function RoleIconCard({ image, roleId, event, rarity }: IRoleIcon) {
  return (
    <StyledRoleIconCard>
      <Image
        alt=""
        role="presentation"
        src={image.url}
        width={image.width}
        height={image.height}
      ></Image>
      <p className="rarity">
        Rarity: <span>{rarity}</span>
      </p>
      <p>
        Role: <span>{roleId.toString()}</span>
      </p>
      <p>
        Event: <span>{event?.toString() || "NONE"}</span>
      </p>
    </StyledRoleIconCard>
  );
}

export { RoleIconCard };
