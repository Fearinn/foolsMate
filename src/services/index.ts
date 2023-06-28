import { AvatarItem } from "@/components/avatarItem/avatarItems.types";
import {
  RewardType,
  Season,
  Background,
  Reward,
} from "@/components/BattlePass/battlePass.types";
import { Player } from "@/components/players/players.types";
import { RoleIcon } from "@/components/roleIcon/roleIcons.types";
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

export async function getBattlePassSeason() {
  const response = await instance.get<Season>("battlePass/season");

  return response.data;
}

export async function getRewards() {
  const response = await instance.get<Reward[]>("battlePass/rewards");

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
