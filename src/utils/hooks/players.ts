import { Player } from "@/components/players/players.types";
import { getPlayers } from "@/services";
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
