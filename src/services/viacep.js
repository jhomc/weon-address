import axios from "axios";

export const viacep = axios.create({
  baseURL: "http://viacep.com.br/ws",
})

export async function fetchViacepAddress(zipcode) {
  try {
    const response = await viacep.get(`/${zipcode}/json`);

    return response
  } catch (error) {
    throw error
  }
} 