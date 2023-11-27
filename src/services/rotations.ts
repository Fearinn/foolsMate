import { instance } from "./config";

export async function getRotations() {
  const response = await instance.get("roleRotations");

  return response.data;
}
