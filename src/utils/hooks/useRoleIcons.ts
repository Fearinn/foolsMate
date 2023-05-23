import { Paginated } from "@/types/utils/Paginated";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ResponseData } from "../../types/ResponseData";
import { RoleIcon } from "@/components/roleIcon/types/RoleIcon";
import { getRoleIcons } from "@/services";

export function useRoleIcons(filters: Paginated<RoleIcon>) {
  const response = useQuery<ResponseData<RoleIcon>, AxiosError>(
    ["getRoleIcons", filters],
    () => getRoleIcons(filters),
    {
      staleTime: 1000 * 60 * 30,
      keepPreviousData: true,
    }
  );

  return response;
}
