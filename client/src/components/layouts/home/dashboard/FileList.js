import {
  Flex,
  Text,
  UnorderedList,
  ListItem,
  Table,
  Thead,
  Th,
  Tr,
  Box,
  Tbody,
} from "@chakra-ui/react";
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
    <Box w="full">
      <OnlineLabel label={`Files — ${files?.length || 0}`} />
      <Table w="full">
        <Thead bg="brandGray.darker" p="2" mx="2">
          <Tr>
            <Th>Name</Th>
            <Th>Access level</Th>
            <Th>Last Modified</Th>
            <Th>Uploaded by</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>

        <Tbody>
          {files?.map((file) => (
            <FileListItem key={file.uuid} file={file} />
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
