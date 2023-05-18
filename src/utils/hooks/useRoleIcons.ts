import { Paginated } from "@/types/utils/Paginated";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { IResponseData } from "../../types/ResponseData";
import { IRoleIcon } from "@/components/roleIcon/types/RoleIcon";
import { getRoleIcons } from "@/services";

export function useRoleIcons(filters: Paginated<IRoleIcon>) {
  const response = useQuery<IResponseData<IRoleIcon>, AxiosError>(
    ["getRoleIcons", filters],
    () => getRoleIcons(filters),
    {
      staleTime: 1000 * 60 * 30,
      keepPreviousData: true,
    }
  );

  return response;
}
