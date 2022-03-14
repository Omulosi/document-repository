import { Flex, Text, UnorderedList, ListItem } from "@chakra-ui/react";
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
    <>
      <UnorderedList listStyleType="none" ml="0" w="full" mt="2">
        <OnlineLabel
          label={`Users — ${users?.length || 0}`}
          key={users.length}
        />
        {/** Header */}
        <ListItem p="3" mx="3" bg="brandGray.darker" key={users.length * 2}>
          <Flex align="center" justify="space-between">
            <Flex align="center" w={"full"} _hover={{ cursor: "pointer" }}>
              <Text ml="2">Name</Text>
            </Flex>
            {/**  access level */}

            <Flex w="full">
              <Text>Access Level</Text>
            </Flex>

            <Flex w="full">
              <Text>Status</Text>
            </Flex>

            <div>
              <Text>Action</Text>
            </div>
          </Flex>
        </ListItem>
        {users?.map((user) => (
          <UserListItem key={user.id} user={user} />
        ))}
      </UnorderedList>
    </>
  );
}
