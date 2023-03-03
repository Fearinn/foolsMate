import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/",
});

async function getAllItems<T = unknown>(path: string) {
  const response = await instance.get<T[]>(`items/${path}`);
  console.log(response.data)
  return response.data;
}

export { getAllItems };
