import { Player } from "@/components/players/players.types";
import { instance } from "./config";

export async function getPlayers([username, username2]: string[]) {
  const response = await instance.get<Player[]>("players/search", {
    params: { username, username2},
  });

  return response.data;
}
