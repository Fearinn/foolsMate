import { Background } from "@/components/BattlePass/battlePass.types";
import { ResponseData } from "@/types/ResponseData";
import { instance } from "../config";

export async function getBackgrounds(idList: string) {
  const response = await instance.get<ResponseData<Background>>(
    "items/backgrounds",
    {
      params: {
        idList: idList,
      },
    }
  );

  return response.data.items[0];
}
