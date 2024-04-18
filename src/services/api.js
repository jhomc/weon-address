import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const viacep = axios.create({
  baseURL: "http://viacep.com.br/ws",
})