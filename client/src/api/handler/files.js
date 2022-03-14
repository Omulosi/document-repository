import { useToast } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getResource,
  updateResource,
  uploadFileResource,
  deleteResource,
} from "../fetchers";

const getFileById = async (fileId) => {
  const data = await getResource(`/api/files/${fileId}`);

  return data;
};

const getFileList = async () => {
  const data = await getResource("/api/files/");

  return data;
};

const updateFile = async (fileDetails) => {
  const { data } = await updateResource(
    `/api/files/${fileDetails.fileId}`,
    fileDetails
  );
  return data;
};

const deleteFile = async (fileDetails) => {
  const { data } = await deleteResource(`/api/files/${fileDetails.fileId}`);
  return data;
};

const uploadFile = async (file) => {
  const { data } = await uploadFileResource("/api/files/upload", file);
  return data;
};

export function useFileById(fileId) {
  return useQuery(["files", fileId], () => getFileById(fileId));
}

export function useFileList() {
  return useQuery("files", () => getFileList());
}

export function useUpdateFile() {
  const toast = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation(updateFile, {
    onSuccess: () => {
      queryClient.invalidateQueries("files");
      // toast success
      toast({
        title: "File updated",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: () => {
      // toast error
      toast({
        title: "Error updating file",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  return mutation;
}

export function useDeleteFile() {
  const toast = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation(deleteFile, {
    onSuccess: () => {
      queryClient.invalidateQueries("files");
      // toast success
      toast({
        title: "File deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: () => {
      // toast error
      toast({
        title: "Error deleting file",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  return mutation;
}

export function useUploadFileResource() {
  const toast = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation(uploadFile, {
    onSuccess: () => {
      queryClient.invalidateQueries("files");
      toast({
        title: "File uploaded",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        title: "Error uploading file",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  return mutation;
}
