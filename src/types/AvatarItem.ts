type IAvatarItem = {
  id: string;
  rarity: "COMMON" | "RARE" | "EPIC" | "LEGENDARY";
  costInGold: number;
  imageUrl: "string";
  type: "HAIR" | "FRONT" | "SHIRT" | "HAT" | "GLASSES" | "BACK" | "MASK" | "GRAVESTONE" | "MOUTH",
  gender: "FEMALE" | "MALE"
};

export default IAvatarItem;
