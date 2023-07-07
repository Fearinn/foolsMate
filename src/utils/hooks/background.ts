import { Background } from "@/components/BattlePass/battlePass.types";
import { getBackgrounds } from "@/services/items/backgrounds";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useBackground(idList: string) {
  const response = useQuery<Background, AxiosError>({
    queryKey: ["getBackgrounds"],
    queryFn: () => getBackgrounds(idList),
    staleTime: 1000 * 60 * 30,
    keepPreviousData: true,
  });

  return response;
}
