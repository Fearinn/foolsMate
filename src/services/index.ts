import {
  Reward,
  Season
} from "@/components/BattlePass/battlePass.types";
import { instance } from "./config";

export async function getBattlePassSeason() {
  const response = await instance.get<Season>("battlePass/season");

  return response.data;
}

export async function getRewards() {
  const response = await instance.get<Reward[]>("battlePass/rewards");

  return response.data;
}
