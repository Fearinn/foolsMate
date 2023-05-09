import { Paginated } from "@/types/utils/Paginated";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getAvatarItems } from "../../services";
import { IAvatarItem } from "../../types/AvatarItem";
import { IResponseData } from "../../types/ResponseData";

export function useAvatarItems(filters: Paginated<IAvatarItem>) {
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
