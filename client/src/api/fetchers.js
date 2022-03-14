import { api } from "./apiClient";

export const postResource = async (url, resource) => {
  const { data } = await api().post(url, resource);
  return data;
};

export const getResource = async (url) => {
  const { data } = await api().get(url);
  return data;
};

export const updateResource = async (url, resource) => {
  const { data } = await api().patch(url, resource);
  return data;
};

export const deleteResource = async (url, reason) => {
  const { data } = await api().delete(url, reason);
  return data;
};

export const uploadFileResource = async (url, file) => {
  const { data } = await api().post(url, file, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};
