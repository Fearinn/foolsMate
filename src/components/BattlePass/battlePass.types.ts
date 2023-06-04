import { Rarity } from "@/types/Rarity";

export type Season = {
  startTime: string;
  number: number;
  durationInDays: number;
  goldPrice: number;
  goldPricePerReward: number;
  gemPricePerReward: number;
  xpPerReward: number;
  rewards: Reward[];
  iconUrl: string;
  seasonBackgroundId: string;
};

export type Reward = {
  type: RewardType;
  amount: number;
  free: boolean;
  avatarItemIdMale?: string;
  avatarItemIdFemale?: string;
  avatarItemId?: string;
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
  imageDay: BackgroundImage;
  imageDayWide: BackgroundImage;
  imageNight: BackgroundImage;
  imageNightWide: BackgroundImage;
  imageDaySmall: BackgroundImage;
  imageNightSmall: BackgroundImage;
  backgroundColorDay: string;
  backgroundColorNight: string;
  event?: string;
};

type BackgroundImage = {
  url: string;
  width: number;
  height: number;
};
