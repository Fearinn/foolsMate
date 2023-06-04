import { Rarity } from "@/types/Rarity";

export type RoleIcon = {
  id: string;
  rarity: Rarity;
  image: {
    url: string;
    width: number;
    height: number;
  };
  roleId: string | RegExp;
  event?: string | RegExp;
};
