import { Paginated } from "@/types/utils/Paginated";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ResponseData } from "../../types/ResponseData";
import { RoleIcon } from "@/components/roleIcon/roleIcons.types";
import { getRoleIcons } from "@/services/items/roleIcons";

type Params = Paginated<RoleIcon> & { idList?: string };

export function useRoleIcons(params: Params) {
  const response = useQuery<ResponseData<RoleIcon>, AxiosError>({
    queryKey: ["getRoleIcons", params],
    queryFn: () => getRoleIcons(params),
    staleTime: 1000 * 60 * 30,
    keepPreviousData: true,
  });

  return response;
}
