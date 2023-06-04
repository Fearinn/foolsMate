import { Paginated } from "@/types/utils/Paginated";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getAvatarItems, getAvatarItemsByIds } from "../../services";
import { AvatarItem } from "../../components/avatarItem/avatarItems.types";
import { ResponseData } from "../../types/ResponseData";

export function useAvatarItems(filters: Paginated<AvatarItem>) {
  const response = useQuery<ResponseData<AvatarItem>, AxiosError>(
    ["getAvatarItems", filters],
    () => getAvatarItems(filters),
    {
      staleTime: 1000 * 60 * 30,
      keepPreviousData: true,
    }
  );

  return response;
}

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
