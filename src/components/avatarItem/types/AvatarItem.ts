import { Rarity } from "../../../types/Rarity";

export type AvatarItem = {
  id: string;
  rarity: Rarity;
  costInGold?: number;
  costInRoses?: number;
  imageUrl: string;
  type: AvatarItemType;
  gender: AvatarItemGender;
  event?: string;
};

export type AvatarItemType =
  | "HAIR"
  | "FRONT"
  | "SHIRT"
  | "HAT"
  | "GLASSES"
  | "BACK"
  | "MASK"
  | "GRAVESTONE"
  | "MOUTH"
  | "EYES"
  | "BADGE";

export type AvatarItemGender = "FEMALE" | "MALE" | "NEUTRAL";
