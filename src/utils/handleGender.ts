import { IAvatarItemGender } from "../types/AvatarItem";

export function handleGender(gender: string | undefined) {
  if (gender === "BOTH") return "";
  if (gender === "") return undefined;
  return gender as IAvatarItemGender;
}