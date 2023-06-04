import { RewardType, Season } from "@/components/BattlePass/battlePass.types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getBattlePassSeason } from "../../services";

export function useBattlePassSeason(rewardsTypes: RewardType[]) {
  const response = useQuery<Season, AxiosError>(
    ["getBattlePassSeason"],
    () => getBattlePassSeason(rewardsTypes),
    {
      staleTime: 1000 * 60 * 30,
      keepPreviousData: true,
    }
  );

  return response;
}
