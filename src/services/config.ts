import axios from "axios";

const prod = process.env.NODE_ENV === "production";

export const instance = axios.create({
  baseURL: prod ? "https://foolsmateapi.onrender.com/" : "http://localhost:3000",
  headers: {
    Accept: "application/json",
  },
});
