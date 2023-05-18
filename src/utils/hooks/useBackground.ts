import { IBackground } from "@/components/BattlePass/types/Background";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getBackgrounds } from "../../services";

export function useBackground(id: string) {
  const response = useQuery<IBackground, AxiosError>(
    ["getBackgrounds"],
    () => getBackgrounds(id),
    {
      staleTime: 1000 * 60 * 30,
      keepPreviousData: true,
    }
  );

  return response;
}
