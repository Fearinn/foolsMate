import axios from "axios";

export const instance = axios.create({
  baseURL: "https://wolvesvillewiki.cyclic.app/" /*  "http://localhost:3000" */,
  headers: {
    Accept: "application/json",
  },
});
