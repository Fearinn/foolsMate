import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getBattlePassSeason } from "../../services";
import { IRewardType, ISeason } from "../../components/BattlePass/types/BattlePassSeason";

export function useBattlePassSeason(rewardsTypes: IRewardType[]) {
  const response = useQuery<ISeason, AxiosError>(
    ["getBattlePassSeason"],
    () => getBattlePassSeason(rewardsTypes),
    {
      staleTime: 1000 * 60 * 30,
      keepPreviousData: true,
    }
  );

  return response;
}
