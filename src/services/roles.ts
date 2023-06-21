import { Role } from "@/components/roles/roles.types";
import { ResponseData } from "@/types/ResponseData";
import { Paginated } from "@/types/utils/Paginated";
import { instance } from "./config";

export async function getRoles(filters: Paginated<Role>) {
  const response = await instance.get<ResponseData<Role>>("roles", {
    params: filters,
  });

  return response.data;
}
