import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { getBattlePassSeason } from "../../services";
import { IRewardType, ISeason } from "../../types/BattlePassSeason";

export function useBattlePassSeason(rewardsTypes: IRewardType[]) {
  const response = useQuery<ISeason, AxiosError>(
    ["getAvatarItems"],
    () => getBattlePassSeason(rewardsTypes),
    {
      staleTime: 1000 * 60 * 30,
      keepPreviousData: true,
    }
  );

  return response;
}
