import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { getAvatarItems } from "../../services";
import { IAvatarItem } from "../../types/AvatarItem";
import { IResponseData } from "../../types/ResponseData";

export function useAvatarItems(
  filters: Partial<{ page: number; limit: number } & IAvatarItem>
) {
  const response = useQuery<IResponseData<IAvatarItem>, AxiosError>(
    ["getAvatarItems", filters],
    () => getAvatarItems(filters),
    {
      staleTime: 1000 * 60 * 30,
      keepPreviousData: true,
    }
  );

  return response;
}
