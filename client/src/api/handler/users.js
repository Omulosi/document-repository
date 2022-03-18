import { useToast } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getResource, updateResource } from "../fetchers";

const getUser = async () => {
  const data = await getResource("/api/auth/users/me/");

  return data;
};

const getUserById = async (userId) => {
  const data = await getResource(`/api/users/${userId}`);

  return data;
};

const getUserList = async () => {
  const data = await getResource("/api/users/");

  return data;
};

const updateUser = async (userDetails) => {
  const { data } = await updateResource(
    `/api/users/${userDetails.userId}/`,
    userDetails
  );
  return data;
};

const activateUser = async ({ url, is_active }) => {
  const { data } = await updateResource(`${url}`, {
    is_active,
  });
  return data;
};

export function useCurrentUser() {
  return useQuery("user", () => getUser());
}

export function useUserById(userId) {
  return useQuery(["users", userId], () => getUserById(userId));
}

export function useUserList() {
  return useQuery("users", () => getUserList());
}

export function useUpdateUser() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      // toast success
      toast({
        title: "User details updated",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: () => {
      // toast error
      toast({
        title: "Error updating account",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  return mutation;
}
