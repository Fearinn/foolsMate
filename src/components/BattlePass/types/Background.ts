import { Rarity } from "@/types/Rarity";

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
