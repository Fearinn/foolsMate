import { RotationResponse } from "@/components/MatchHelper/matchHelper.types";
import { getRotations } from "@/services/rotations";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useRotations() {
  const response = useQuery<RotationResponse, AxiosError>({
    queryKey: ["getRotations"],
    queryFn: getRotations,
    staleTime: 1000 * 60 * 30,
    keepPreviousData: true,
  });

  return response;
}
