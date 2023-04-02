import axios from "axios";
import { IAvatarItem } from "../types/AvatarItem";
import { IResponseData } from "../types/ResponseData";
import { IRewardType, ISeason } from "../types/BattlePassSeason";
import { IBackground } from "../types/Background";

const instance = axios.create({
  baseURL: /* "https://wolvesvillewiki.cyclic.app/" */ "http://localhost:3000",
  headers: {
    Accept: "application/json",
  },
});

export async function getAvatarItems(
  params: Partial<{ page: number; limit: number } & IAvatarItem>
) {
  const response = await instance.get<IResponseData<IAvatarItem>>(
    `items/avatarItems`,
    {
      params: {
        page: params.page || 1,
        limit: params.limit || 25,
        ...params,
      },
    }
  );
  return response.data;
}

export async function getAvatarItemsByIds(ids: string[]) {
  const response = await instance.post<IAvatarItem[]>(
    `items/avatarItemsByIds`,
    {
      ids,
    }
  );
  return response.data;
}

export async function getBattlePassSeason(rewardsTypes: IRewardType[]) {
  const response = await instance.post<ISeason>(
    "battlePass/seasonByRewardsType",
    { types: rewardsTypes }
  );

  return response.data;
}

export async function getBackgrounds(id: string) {
  const response = await instance.post<IBackground[]>(
    "items/backgroundsByIds",
    {
      ids: [id],
    }
  );

  return response.data[0];
}
