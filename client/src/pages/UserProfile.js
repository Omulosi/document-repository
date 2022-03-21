import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  LightMode,
  Spacer,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import toErrorMap from "utils/toErrorMap";
import InputField from "components/shared/InputField";
import SelectField from "../components/shared/SelectField";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import {
  useUserById,
  useUpdateUser,
  useCurrentUser,
} from "../api/handler/users";
import Loading from "../components/items/Loading";

export default function UserProfile() {
  const { userId } = useParams();
  const { data: user, isLoading } = useUserById(userId);

  const { data: loggedInUser } = useCurrentUser();

  // admin user cannot edit their fields
  const isFieldDisabled = loggedInUser?.email === user?.email;

  const updateMutation = useUpdateUser();

  const history = useHistory();

  async function handleUpdateUser(values, { setErrors }) {
    try {
      values = { ...values, access_level: +values.accessLevel };
      delete values.email;
      delete values.accessLevel;
      updateMutation.mutate({ ...values, userId });
    } catch (err) {
      setErrors(toErrorMap(err));
    }
  }

  const toggleActiveStatus = () => {
    let isActive = !user?.is_active;

    updateMutation.mutate({ userId, is_active: isActive });

    console.log({ isActive });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center">
      <Box px={4} width="full" maxWidth="500px">
        <Flex mb="4" justify="center">
          <Heading fontSize="24px">{`${
            user?.name || "USER"
          }'s Profile`}</Heading>
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
              onSubmit={handleUpdateUser}
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
                      disabled
                    />

                    <SelectField
                      value={values.accessLevel}
                      label="access level"
                      name="accessLevel"
                      autoComplete="access_level"
                      isDisabled={isFieldDisabled}
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
                      isDisabled={isFieldDisabled}
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
          {!isFieldDisabled && (
            <>
              <Flex>
                <Heading fontSize="18px">AUTHENTICATION</Heading>
              </Flex>

              <Flex mt="4">
                <Button
                  background={user?.is_active ? "red.400" : "green.400"}
                  color="white"
                  type="submit"
                  _hover={{ bg: "highlight.hover" }}
                  _active={{ bg: "highlight.active" }}
                  _focus={{ boxShadow: "none" }}
                  fontSize={"14px"}
                  w="2xl"
                  onClick={toggleActiveStatus}
                >
                  {user?.is_active ? "Deactivate" : "Activate"}
                </Button>

                <Spacer />
              </Flex>
            </>
          )}
        </Box>
      </Box>
    </Flex>
  );
}
