import axios from "axios";

export const instance = axios.create({
  baseURL: "https://foolsmate.cyclic.app/",
  headers: {
    Accept: "application/json",
  },
});
