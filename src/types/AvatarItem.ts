import { IRarity } from "./Rarity";

export type IAvatarItem = {
  id: string;
  rarity: IRarity;
  costInGold?: number;
  costInRoses?: number;
  imageUrl: "string";
  type: IAvatarItemType;
  gender?: IAvatarItemGender;
  event?: string;
};

export type IAvatarItemType =
  | "HAIR"
  | "FRONT"
  | "SHIRT"
  | "HAT"
  | "GLASSES"
  | "BACK"
  | "MASK"
  | "GRAVESTONE"
  | "MOUTH";

export type IAvatarItemGender = "FEMALE" | "MALE" | "";
