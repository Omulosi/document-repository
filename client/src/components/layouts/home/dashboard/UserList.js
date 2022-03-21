import { Flex, Text, Box, Table, Thead, Tbody, Th, Tr } from "@chakra-ui/react";
import UserListItem from "../../../items/UserListItem";
import OnlineLabel from "components/sections/OnlineLabel";
import React from "react";

export default function UserList({ users }) {
  if (users?.length === 0) {
    return (
      <Flex justify={"center"} align={"center"} w={"full"}>
        <Text textColor={"brandGray.accent"}>No files uploaded yet</Text>
      </Flex>
    );
  }

  return (
    <Box w="full">
      <OnlineLabel label={`Files — ${users?.length || 0}`} />
      <Table w="full">
        <Thead bg="brandGray.darker" p="2" mx="2">
          <Tr>
            <Th>Name</Th>
            <Th>Access level</Th>
            <Th>status</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>

        <Tbody>
          {users?.map((user, ind) => (
            <UserListItem key={`${ind}-${user?.id}`} user={user} />
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
