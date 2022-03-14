import React from "react";
import { CircularProgress, Flex } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center">
      <CircularProgress isIndeterminate />
    </Flex>
  );
}
