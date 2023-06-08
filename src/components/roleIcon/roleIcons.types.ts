import { Image } from "@/types/Image";
import { Rarity } from "@/types/Rarity";

export type RoleIcon = {
  id: string;
  rarity: Rarity;
  image: Image;
  roleId: string | RegExp;
  event?: string | RegExp;
};
