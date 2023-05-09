import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getBackgrounds } from "../../services";
import { IBackground } from "../../types/Background";

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
