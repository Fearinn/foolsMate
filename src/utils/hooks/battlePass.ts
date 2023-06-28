import {
  Reward,
  RewardType,
  Season,
} from "@/components/BattlePass/battlePass.types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getBattlePassSeason, getRewards } from "../../services";

export function useBattlePassSeason() {
  const response = useQuery<Season, AxiosError>({
    queryKey: ["getBattlePassSeason"],
    queryFn: getBattlePassSeason,
    staleTime: 1000 * 60 * 30,
    keepPreviousData: true,
  });

  return response;
}

export function useRewards() {
  const response = useQuery<Reward[], AxiosError>({
    queryKey: ["getRewards"],
    queryFn: getRewards,
    staleTime: 1000 * 60 * 30,
    keepPreviousData: true,
  });

  return response;
}
