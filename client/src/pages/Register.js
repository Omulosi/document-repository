import React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { Link as RLink, useHistory } from "react-router-dom";
import InputField from "components/shared/InputField";
import { register } from "api/handler/auth";
import toErrorMap from "utils/toErrorMap";
import { RegisterSchema } from "validation/auth.schema";

export default function Register() {
  const [error, setError] = React.useState(null);

  const history = useHistory();

  const handleSubmit = async (values, { setErrors }) => {
    try {
      const { data } = await register(values);
      if (data) {
        history.push("/login");
      }
    } catch (err) {
      if (err?.response?.status === 400) {
        setError(err.response?.data?.non_field_errors);
      } else if (err?.response?.status === 500) {
        setError("Server error");
      } else {
        setErrors(toErrorMap(err));
      }
    }
  };

  return (
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center">
      <Box px={4} width="full" maxWidth="500px" textAlign="center">
        <Flex
          mb="4"
          justify="center"
          onClick={() => history.push("/")}
          cursor="pointer"
        >
          <Image src="/discord-logo.png" w="80px" />
        </Flex>
        <Flex mb="4" justify="center">
          <Text variant="small" color="red.300">
            {error}
          </Text>
        </Flex>
        <Box p={4} borderRadius={4} background="brandGray.light">
          <Box textAlign="center">
            <Heading fontSize="24px">Welcome to Document Repository</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={RegisterSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <InputField
                    label="Full Name"
                    name="name"
                    autoComplete="name"
                    type="text"
                  />
                  <InputField
                    label="Email"
                    name="email"
                    autoComplete="email"
                    type="email"
                  />

                  <InputField
                    label="password"
                    name="password"
                    autoComplete="password"
                    type="password"
                  />

                  <Button
                    background="highlight.standard"
                    color="white"
                    width="full"
                    mt={4}
                    type="submit"
                    isLoading={isSubmitting}
                    _hover={{ bg: "highlight.hover" }}
                    _active={{ bg: "highlight.active" }}
                    _focus={{ boxShadow: "none" }}
                  >
                    Register
                  </Button>
                  <Text mt="4">
                    Already have an account?{" "}
                    <Link as={RLink} to="/login" textColor="highlight.standard">
                      Sign In
                    </Link>
                  </Text>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}
