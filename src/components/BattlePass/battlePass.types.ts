import { Image } from "@/types/Image";
import { Rarity } from "@/types/Rarity";

export type Season = {
  startTime: string;
  number: number;
  durationInDays: number;
  goldPrice: number;
  goldPricePerReward: number;
  gemPricePerReward: number;
  xpPerReward: number;
  iconUrl: string;
  seasonBackgroundId: string;
};

export type Reward = {
  type: RewardType;
  amount: number;
  free: boolean;
  item: {
    id: string;
    image: Image;
  } | null;
};

export type RewardType =
  | "AVATAR_ITEM"
  | "ROLE_ICON"
  | "ROSE_PACKAGE"
  | "GOLD"
  | "GEM"
  | "EMOJI"
  | "ROLE_CARD_ABILITY_EXCHANGE_VOUCHER"
  | "LOADING_SCREEN";

export type Background = {
  id: string;
  rarity: Rarity;
  imageDay: Image;
  imageDayWide: Image;
  imageNight: Image;
  imageNightWide: Image;
  imageDaySmall: Image;
  imageNightSmall: Image;
  backgroundColorDay: string;
  backgroundColorNight: string;
  event?: string;
};
