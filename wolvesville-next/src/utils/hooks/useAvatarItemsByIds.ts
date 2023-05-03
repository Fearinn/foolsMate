import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { getAvatarItemsByIds } from "../../services";
import { IAvatarItem } from "../../types/AvatarItem";
import { IResponseData } from "../../types/ResponseData";

export function useAvatarItemsByIds(ids: string[]) {
  const response = useQuery<IResponseData<IAvatarItem>, AxiosError>(
    ["getAvatarItemsByIds", ids],
    () => getAvatarItemsByIds(ids),
    {
      staleTime: 1000 * 60 * 30,
      keepPreviousData: true,
    }
  );

  return response;
}
