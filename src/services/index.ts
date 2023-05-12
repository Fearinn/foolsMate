import { IAvatarItem } from "@/components/avatarItem/types/AvatarItem";
import { IBackground } from "@/components/BattlePass/types/Background";
import {
  IRewardType,
  ISeason
} from "@/components/BattlePass/types/BattlePassSeason";
import { IResponseData } from "@/types/ResponseData";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://wolvesvillewiki.cyclic.app/" /* "http://localhost:3000" */,
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
        page: params.page,
        limit: params.limit,
        ...params,
      },
    }
  );

  return response.data;
}

export async function getAvatarItemsByIds(ids: string[], limit = 25) {
  const response = await instance.get<IResponseData<IAvatarItem>>(
    `items/avatarItems/ids`,
    {
      params: {
        ids: ids.join(":"),
        limit,
      },
    }
  );
  return response.data;
}

export async function getBattlePassSeason(rewardsTypes: IRewardType[]) {
  const response = await instance.get<ISeason>("battlePass/season/rewards", {
    params: { rewardsTypes: rewardsTypes.join(":") },
  });

  return response.data;
}

export async function getBackgrounds(id: string) {
  const response = await instance.get<IResponseData<IBackground>>(
    "items/backgrounds/ids",
    {
      params: {
        ids: id,
      },
    }
  );

  return response.data.items[0];
}
