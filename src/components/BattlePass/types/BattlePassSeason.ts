export type ISeason = {
  startTime: string;
  number: number;
  durationInDays: number;
  goldPrice: number;
  goldPricePerReward: number;
  gemPricePerReward: number;
  xpPerReward: number;
  rewards: IReward[];
  iconUrl: string;
  seasonBackgroundId: string;
};

export type IReward = {
  type: IRewardType;
  amount: number;
  free: boolean;
  avatarItemIdMale?: string;
  avatarItemIdFemale?: string;
  avatarItemId?: string;
};

export type IRewardType =
  | "AVATAR_ITEM"
  | "ROLE_ICON"
  | "ROSE_PACKAGE"
  | "GOLD"
  | "GEM"
  | "EMOJI"
  | "ROLE_CARD_ABILITY_EXCHANGE_VOUCHER"
  | "LOADING_SCREEN";
