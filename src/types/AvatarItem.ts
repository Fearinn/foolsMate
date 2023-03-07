type IAvatarItem = {
  id: string;
  rarity: IAvatarRarity;
  costInGold?: number;
  costInRoses?: number;
  imageUrl: "string";
  type: IAvatarItemKind;
  gender?: IAvatarItemGender;
  event?: string;
};

type IAvatarRarity = "COMMON" | "RARE" | "EPIC" | "LEGENDARY";

type IAvatarItemKind =
  | "HAIR"
  | "FRONT"
  | "SHIRT"
  | "HAT"
  | "GLASSES"
  | "BACK"
  | "MASK"
  | "GRAVESTONE"
  | "MOUTH";

type IAvatarItemGender = "FEMALE" | "MALE" | ""

export type { IAvatarItemKind, IAvatarItemGender, IAvatarRarity};

export default IAvatarItem;
