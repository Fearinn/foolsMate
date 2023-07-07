import {
  Background,
  Reward, Season
} from "@/components/BattlePass/battlePass.types";
import { Player } from "@/components/players/players.types";
import { ResponseData } from "@/types/ResponseData";
import { instance } from "./config";

export async function getBattlePassSeason() {
  const response = await instance.get<Season>("battlePass/season");

  return response.data;
}

export async function getRewards() {
  const response = await instance.get<Reward[]>("battlePass/rewards");

  return response.data;
}

export async function getPlayers([username, username2]: string[]) {
  const response = await instance.get<Player[]>("players/search", {
    params: { username, username2 },
  });

  return response.data;
}
