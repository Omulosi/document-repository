import axios from "axios";

import { HOST } from "../config";

const BASE_URL = HOST;

export const api = () => {
  const token = localStorage.getItem("token");

  let client = axios.create({
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    baseURL: BASE_URL,
  });

  client.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      // localStorage.removeItem("token");
      // window.location.reload();
      return Promise.reject(error);
    }
  );

  return client;
};

export const apiWithNoAuth = axios.create({
  baseURL: BASE_URL,
});

// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     // console.log({ error });
//     // const { status } = error.response;
//     // switch (status) {
//     //   // Forbidden
//     //   case 403:
//     //     localStorage.removeItem("user-storage");
//     //     window.location.replace("/login");
//     //     break;
//     //   default:
//     //     break;
//     // }
//     return Promise.reject(error);
//   }
// );
