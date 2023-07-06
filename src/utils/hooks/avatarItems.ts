import { Paginated } from "@/types/utils/Paginated";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getAvatarItems } from "../../services";
import { AvatarItem } from "../../components/avatarItem/avatarItems.types";
import { ResponseData } from "../../types/ResponseData";

type Args = Paginated<AvatarItem> & { idList?: string };

export function useAvatarItems(filters: Args) {
  const response = useQuery<ResponseData<AvatarItem>, AxiosError>({
    queryKey: ["getAvatarItems", filters],
    queryFn: () => getAvatarItems(filters),
    staleTime: 1000 * 60 * 30,
    keepPreviousData: true,
  });

  return response;
}
