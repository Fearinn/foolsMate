import axios from "axios";
import { IAvatarItem } from "../types/AvatarItem";
import { IResponseData } from "../types/ResponseData";
import { IRewardType, ISeason } from "../types/BattlePassSeason";

const instance = axios.create({
  baseURL: "https://wolvesvillewiki.cyclic.app/" /* "http://localhost:3000" */,
  headers: {
    Accept: "application/json",
  },
});

async function getAvatarItems(
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

async function getBattlePassSeason(rewardsTypes: IRewardType[]) {
  const response = await instance.post<ISeason>(
    "battlePass/seasonByRewarsType",
    { types: rewardsTypes }
  );

  return response.data;
}

export { getAvatarItems, getBattlePassSeason };
