import axios from "axios";
import IAvatarItem from "../types/AvatarItem";
import IResponseData from "../types/ResponseData";

const instance = axios.create({
  baseURL: "http://localhost:3000/",
});

async function getAvatarItems() {
  const response = await instance.get<IResponseData<IAvatarItem>>(`items/avatarItems`);
  console.log(response.data)
  return response.data;
}

export { getAvatarItems };
