import axios from "axios";

export const http = axios.create({
  baseURL: "https://api.argentinadatos.com/v1",
});
