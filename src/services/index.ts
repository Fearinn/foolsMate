import axios from "axios";
import IAvatarItem from "../types/AvatarItem";
import IResponseData from "../types/ResponseData";

const instance = axios.create({
  baseURL: "https://wolvesvillewiki.cyclic.app/",
  headers: {
    Accept: "application/json",
  },
});

async function getAvatarItems(
  params: Partial<{ page: number; limit: number } & IAvatarItem>
) {
  const response = await instance.get<IResponseData<IAvatarItem>>(
    `items/avatarItems`,
    {
      params: {
        page: params.page || 1,
        limit: params.limit || 25, 
        ...params,
      },
    }
  );
  return response.data;
}

export { getAvatarItems };
