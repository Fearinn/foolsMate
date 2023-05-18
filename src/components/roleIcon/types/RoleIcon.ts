import { IRarity } from "@/types/Rarity";

export type IRoleIcon = {
  id: string;
  rarity: IRarity;
  image: {
    url: string;
    width: number;
    height: number;
  };
  roleId: string | RegExp;
  event?: string | RegExp;
};
