import { Background } from "@/components/BattlePass/battlePass.types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getBackgrounds } from "../../services";

export function useBackground(id: string) {
  const response = useQuery<Background, AxiosError>({
    queryKey: ["getBackgrounds"],
    queryFn: () => getBackgrounds(id),
    staleTime: 1000 * 60 * 30,
    keepPreviousData: true,
  });

  return response;
}
