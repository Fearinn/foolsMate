import { IRarity } from "@/types/Rarity";

export type IBackground = {
  id: string;
  rarity: IRarity;
  imageDay: IBackgroundImage;
  imageDayWide: IBackgroundImage;
  imageNight: IBackgroundImage;
  imageNightWide: IBackgroundImage;
  imageDaySmall: IBackgroundImage;
  imageNightSmall: IBackgroundImage;
  backgroundColorDay: string;
  backgroundColorNight: string;
  event?: string;
};

type IBackgroundImage = {
  url: string;
  width: number;
  height: number;
};
