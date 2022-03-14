import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  LightMode,
  Spacer,
  Tooltip,
  useDisclosure,
  useToast,
  CircularProgress,
} from "@chakra-ui/react";
import { logout } from "api/handler/auth";
import { Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import { useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import userStore from "stores/userStore";
import toErrorMap from "utils/toErrorMap";
import ChangePasswordModal from "components/modals/ChangePasswordModal";
import InputField from "components/shared/InputField";
import SelectField from "../components/shared/SelectField";
import { useCurrentUser, useUpdateUser } from "../api/handler/users";

export default function Account() {
  const { data: user, isLoading } = useCurrentUser();

  const updateMutation = useUpdateUser();

  console.log({ user });

  const cache = useQueryClient();
  const logoutUser = userStore((state) => state.logout);
  const history = useHistory();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function handleLogout() {
    try {
      await logout();
      cache.clear();
      localStorage.removeItem("token");
      logoutUser();
      history.push("/");
    } catch (err) {}
  }

  async function handleUpdateAccount(values, { setErrors }) {
    try {
      values = { ...values, access_level: +values.accessLevel };
      delete values.email;
      delete values.accessLevel;

      updateMutation.mutate({ ...values, userId: user?.pk });
    } catch (err) {
      setErrors(toErrorMap(err));
    }
  }

  if (isLoading) {
    return (
      <Flex
        minHeight="100vh"
        width="full"
        align="center"
        justifyContent="center"
      >
        <CircularProgress isIndeterminate />
      </Flex>
    );
  }

  console.log({ user });

  return (
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center">
      <Box px={4} width="full" maxWidth="500px">
        <Flex mb="4" justify="center">
          <Heading fontSize="24px">MY ACCOUNT</Heading>
        </Flex>
        <Box p={4} borderRadius={4} background="brandGray.light">
          <Box>
            <Formik
              initialValues={{
                email: user?.email,
                name: user?.name,
                accessLevel: user?.access_level,
                role: user?.role,
                image: null,
              }}
              onSubmit={handleUpdateAccount}
            >
              {({ isSubmitting, values }) => (
                <Form>
                  <Box my={4}>
                    <InputField
                      value={values.name}
                      placeholder="Full name"
                      label="name"
                      name="name"
                      autoComplete="name"
                    />
                    <InputField
                      value={values.email}
                      type="email"
                      placeholder="Email"
                      label="Email"
                      name="email"
                      autoComplete="email"
                    />

                    <SelectField
                      value={values.accessLevel}
                      label="access level"
                      name="accessLevel"
                      autoComplete="access_level"
                      isDisabled
                    >
                      <option value={0}>Lowest</option>
                      <option value={1}>Restricted</option>
                      <option value={2}>Confidential</option>
                      <option value={3}>Secret</option>
                      <option value={4}>Top Secret</option>
                    </SelectField>

                    <SelectField
                      value={values.role}
                      label="role"
                      name="role"
                      autoComplete="role"
                      isDisabled
                    >
                      <option value={1}>Admin</option>
                      <option value={2}>Normal</option>
                    </SelectField>

                    <Flex my={8} align={"end"}>
                      <Spacer />
                      <Button
                        mr={4}
                        colorScheme="white"
                        variant="outline"
                        onClick={history.goBack}
                        fontSize={"14px"}
                      >
                        Close
                      </Button>

                      <LightMode>
                        <Button
                          type="submit"
                          colorScheme="green"
                          isLoading={isSubmitting}
                          fontSize={"14px"}
                        >
                          Update
                        </Button>
                      </LightMode>
                    </Flex>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
          <Divider my={"4"} />
          <Flex>
            <Heading fontSize="18px">PASSWORD AND AUTHENTICATION</Heading>
          </Flex>

          <Flex mt="8">
            <Button
              background="highlight.standard"
              color="white"
              type="submit"
              _hover={{ bg: "highlight.hover" }}
              _active={{ bg: "highlight.active" }}
              _focus={{ boxShadow: "none" }}
              onClick={onOpen}
              fontSize={"14px"}
            >
              Change Password
            </Button>

            <Spacer />
            <Button
              colorScheme="red"
              variant="outline"
              onClick={handleLogout}
              fontSize={"14px"}
            >
              Logout
            </Button>
          </Flex>
        </Box>
      </Box>
      {isOpen && <ChangePasswordModal isOpen={isOpen} onClose={onClose} />}
    </Flex>
  );
}
