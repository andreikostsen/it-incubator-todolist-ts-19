import axios from "axios";

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-KEY": "6ebf6ecb-98cd-4407-b583-37b2bde730f6",
  },
});
