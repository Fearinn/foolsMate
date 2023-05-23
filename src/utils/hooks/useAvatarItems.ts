import { Paginated } from "@/types/utils/Paginated";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getAvatarItems } from "../../services";
import { AvatarItem } from "../../components/avatarItem/types/AvatarItem";
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
