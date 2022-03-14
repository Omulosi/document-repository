import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  Select,
} from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";

export default function SelectField({
  label,
  children,
  isDisabled = false,
  ...props
}) {
  const [field, { error, touched }] = useField(props);
  return (
    <FormControl mt={4} isInvalid={error != null && touched}>
      <FormLabel htmlFor={field.name}>
        <Text fontSize="12px" textTransform="uppercase">
          {label}
        </Text>
      </FormLabel>
      {/* @ts-ignore */}
      <Select
        bg="brandGray.dark"
        borderColor="black"
        borderRadius="3px"
        focusBorderColor="highlight.standard"
        isDisabled={isDisabled}
        {...field}
        {...props}
      >
        {children}
      </Select>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}
