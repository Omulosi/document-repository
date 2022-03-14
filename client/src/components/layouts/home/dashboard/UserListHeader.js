import { Flex, GridItem } from "@chakra-ui/react";
import React from "react";
import { Input } from "@chakra-ui/react";

export default function UserListHeader({ handleSearch }) {
  return (
    <GridItem
      gridColumn={3}
      gridRow={"1"}
      bg="brandGray.light"
      padding="10px"
      zIndex="2"
      boxShadow="md"
    >
      <Flex align="center" justify="space-between" p="2">
        <Input placeholder="Search users" onChange={handleSearch} />
      </Flex>
    </GridItem>
  );
}
