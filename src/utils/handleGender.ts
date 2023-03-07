import { IAvatarItemGender } from "../types/AvatarItem";

function handleGender(gender: string | undefined) {
  if (gender === "BOTH") return "";
  if (gender === "") return undefined;
  return gender as IAvatarItemGender;
}

export default handleGender;
