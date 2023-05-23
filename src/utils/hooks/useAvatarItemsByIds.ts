import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getAvatarItemsByIds } from "../../services";
import { AvatarItem } from "../../components/avatarItem/types/AvatarItem";
import { ResponseData } from "../../types/ResponseData";

export function useAvatarItemsByIds(ids: string[]) {
  const response = useQuery<ResponseData<AvatarItem>, AxiosError>(
    ["getAvatarItemsByIds", ids],
    () => getAvatarItemsByIds(ids),
    {
      staleTime: 1000 * 60 * 30,
      keepPreviousData: true,
    }
  );

  return response;
}
