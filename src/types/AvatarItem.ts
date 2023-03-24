export type IAvatarItem = {
  id: string;
  rarity: IAvatarItemRarity;
  costInGold?: number;
  costInRoses?: number;
  imageUrl: "string";
  type: IAvatarItemType;
  gender?: IAvatarItemGender;
  event?: string;
};

export type IAvatarItemRarity = "COMMON" | "RARE" | "EPIC" | "LEGENDARY";

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
