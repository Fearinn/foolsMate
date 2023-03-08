import axios from "axios";
import IAvatarItem from "../types/AvatarItem";
import IResponseData from "../types/ResponseData";

const instance = axios.create({
  baseURL: "https://wolvesvillewiki.cyclic.app/",
  headers: {
    Accept: "application/json"
  }
});

async function getAvatarItems(
  limit: number,
  page: number,
  params: Partial<IAvatarItem>
) {
  const response = await instance.get<IResponseData<IAvatarItem>>(
    `items/avatarItems`,
    {
      params: {
        limit,
        page,
        ...params
      },
    }
  );
  return response.data;
}

export { getAvatarItems };
