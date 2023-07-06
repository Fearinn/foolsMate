import { RoleIcon } from "@/components/roleIcon/roleIcons.types";
import { ResponseData } from "@/types/ResponseData";
import { Paginated } from "@/types/utils/Paginated";
import { instance } from "../config";

type Params = Paginated<RoleIcon> & { idList?: string };

export async function getRoleIcons(params: Params) {
  const response = await instance.get<ResponseData<RoleIcon>>(
    "items/roleIcons",
    { params: params }
  );

  return response.data;
}
