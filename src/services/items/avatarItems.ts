import { AvatarItem } from "@/components/avatarItem/avatarItems.types";
import { ResponseData } from "@/types/ResponseData";
import { Paginated } from "@/types/utils/Paginated";
import { instance } from "../config";

type Params = Paginated<AvatarItem> & { idList?: string };

export async function getAvatarItems(params: Params) {
  const response = await instance.get<ResponseData<AvatarItem>>(
    `items/avatarItems`,
    {
      params: params,
    }
  );

  return response.data;
}
