import axios from "axios";
import IAvatarItem from "../types/AvatarItem";
import IResponseData from "../types/ResponseData";

const instance = axios.create({
  baseURL: "http://localhost:3000/",
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
  console.log(response.data);
  return response.data;
}

export { getAvatarItems };
