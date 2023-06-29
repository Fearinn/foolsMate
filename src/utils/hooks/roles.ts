import { Role } from "@/components/roles/roles.types";
import { getRoles } from "@/services/roles";
import { ResponseData } from "@/types/ResponseData";
import { Paginated } from "@/types/utils/Paginated";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useRoles(filters: Paginated<Role>) {
  const response = useQuery<ResponseData<Role>, AxiosError>({
    queryKey: ["getRoles", filters],
    queryFn: () => getRoles(filters),
    staleTime: 1000 * 60 * 30,
    keepPreviousData: true,
  });

  return response;
}
