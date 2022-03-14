import { Flex, Text, UnorderedList, ListItem } from "@chakra-ui/react";
import FileListItem from "components/items/FileListItem";
import OnlineLabel from "components/sections/OnlineLabel";
import React from "react";

export default function FileList({ files }) {
  if (files?.length === 0) {
    return (
      <Flex justify={"center"} align={"center"} w={"full"}>
        <Text textColor={"brandGray.accent"}>No files to display</Text>
      </Flex>
    );
  }

  return (
    <>
      <UnorderedList listStyleType="none" ml="0" w="full" mt="2">
        <OnlineLabel label={`Files — ${files?.length || 0}`} />
        <ListItem p="4" mx="4" bg="brandGray.darker">
          <Flex align="center" justify="space-between">
            <Flex align="center" w={"full"} _hover={{ cursor: "pointer" }}>
              <Text ml="2">Name</Text>
            </Flex>

            {/**  access level */}
            <Flex w="full">
              <Text>Access Level</Text>
            </Flex>

            {/** last modified */}
            <Flex w="full">
              <Text>Last Modified</Text>
            </Flex>

            {/** uploaded by*/}
            <Flex w="full">
              <Text>Uploaded by</Text>
            </Flex>

            <div>
              <Text>Action</Text>
            </div>
          </Flex>
        </ListItem>
        {files?.map((file) => (
          <FileListItem key={file.uuid} file={file} />
        ))}
      </UnorderedList>
    </>
  );
}
