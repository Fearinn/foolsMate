import { Player } from "@/components/players/players.types";
import { getPlayers } from "@/services/players";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useSinglePlayer(username: string) {
  const response = useQuery<Player[], AxiosError>({
    queryKey: ["getSinglePlayer", username],
    queryFn: () => getPlayers([username]),
    enabled: !!username,
    staleTime: 1000 * 60 * 5,
  });

  return response;
}

export function usePlayersComparison(username: string, username2: string) {
  const response = useQuery<Player[], AxiosError>({
    queryKey: ["getPlayersComparison", [username, username2]],
    queryFn: () => getPlayers([username, username2]),
    enabled: !!username && !!username2 && username !== username2,
    staleTime: 1000 * 60 * 5,
  });

  return response;
}
