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
import { useCurrentUser } from "../api/handler/users";
import {
  useDeleteFile,
  useFileById,
  useUpdateFile,
} from "../api/handler/files";
import Loading from "../components/items/Loading";
import AlertDialogModal from "../components/modals/AlertDialogModal";

export default function FileDetails() {
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);

  const { fileId } = useParams();

  // get this user
  const { data: file, isLoading } = useFileById(fileId);

  const { data: currentUser } = useCurrentUser();

  const updateMutation = useUpdateFile();

  const deleteMutation = useDeleteFile();

  const isAdmin = currentUser?.role === 1;

  const history = useHistory();

  async function handleUpdateFile(values, { setErrors }) {
    try {
      values = { ...values, access_level: +values.accessLevel };
      delete values.accessLevel;
      console.log({ values });
      updateMutation.mutate({ ...values, fileId });
    } catch (err) {
      setErrors(toErrorMap(err));
    }
  }

  function handleDeleteFile() {
    deleteMutation.mutate({ fileId });
    history.push("/files");
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center">
      <Box px={4} width="full" maxWidth="500px">
        <Flex mb="4" justify="center">
          <Heading fontSize="24px">FILE DETAILS</Heading>
        </Flex>
        <Box p={4} borderRadius={4} background="brandGray.light">
          <Box>
            <Formik
              initialValues={{
                name: file?.name,
                type: file?.type,
                accessLevel: file?.access_level,
              }}
              onSubmit={handleUpdateFile}
            >
              {({ isSubmitting, values }) => (
                <Form>
                  <Box my={4}>
                    <InputField
                      value={values.name}
                      placeholder="File name"
                      label="name"
                      name="name"
                      autoComplete="name"
                    />

                    <InputField
                      value={values.type}
                      placeholder="File type"
                      label="type"
                      name="type"
                      autoComplete="type"
                      isDisabled
                    />

                    <SelectField
                      value={values.accessLevel}
                      label="access level"
                      name="accessLevel"
                      autoComplete="access_level"
                      isDisabled={!isAdmin}
                    >
                      <option value={0}>Lowest</option>
                      <option value={1}>Restricted</option>
                      <option value={2}>Confidential</option>
                      <option value={3}>Secret</option>
                      <option value={4}>Top Secret</option>
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
          {isAdmin && (
            <Flex mt="4">
              <span></span>

              <Button
                colorScheme="red"
                fontSize={"14px"}
                onClick={() => setIsOpen(true)}
              >
                Delete File
              </Button>
            </Flex>
          )}
        </Box>
      </Box>
      {isOpen && (
        <AlertDialogModal
          isOpen={isOpen}
          onClose={onClose}
          handleSubmit={handleDeleteFile}
          title="Delete File"
          message="Are you sure? You can't undo this action afterwards."
        />
      )}
    </Flex>
  );
}
