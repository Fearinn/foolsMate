import { AvatarItem } from "@/components/avatarItem/types/AvatarItem";
import { Background } from "@/components/BattlePass/types/Background";
import {
  RewardType,
  Season,
} from "@/components/BattlePass/types/BattlePassSeason";
import { Player } from "@/components/players/players.types";
import { RoleIcon } from "@/components/roleIcon/types/RoleIcon";
import { ResponseData } from "@/types/ResponseData";
import { Paginated } from "@/types/utils/Paginated";
import { instance } from "./config";

export async function getAvatarItems(params: Paginated<AvatarItem>) {
  const response = await instance.get<ResponseData<AvatarItem>>(
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
  const response = await instance.get<ResponseData<AvatarItem>>(
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

export async function getBattlePassSeason(rewardsTypes: RewardType[]) {
  const response = await instance.get<Season>("battlePass/season/rewards", {
    params: { rewardsTypes: rewardsTypes.join(":") },
  });

  return response.data;
}

export async function getBackgrounds(id: string) {
  const response = await instance.get<ResponseData<Background>>(
    "items/backgrounds/ids",
    {
      params: {
        ids: id,
      },
    }
  );

  return response.data.items[0];
}

export async function getRoleIcons(filters: Paginated<RoleIcon>) {
  const response = await instance.get<ResponseData<RoleIcon>>(
    "items/roleIcons",
    { params: filters }
  );

  return response.data;
}

export async function getPlayers([username, username2]: string[]) {
  const response = await instance.get<Player[]>("players/search", {
    params: { username, username2 },
  });

  return response.data;
}
