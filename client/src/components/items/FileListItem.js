import {
  Icon,
  Flex,
  IconButton,
  ListItem,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tag,
  TagLabel,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { FaEllipsisV, FaUser, FaEdit } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import dayjs from "dayjs";
import { ACCESS_LEVELS, DATE_FORMAT } from "../../config";
import ViewPdfModal from "../modals/ViewPdfModal";
import { PictureAsPdf } from "@material-ui/icons";
import FullScreenDialog from "../modals/FullScreenDialog";

export default function FileListItem({ file }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ListItem
        p="4"
        mx="4"
        _hover={{
          bg: "brandGray.dark",
          borderRadius: "5px",
        }}
      >
        <Flex align="center" justify="space-between">
          {/**  name */}
          <Flex
            align="center"
            w="full"
            _hover={{ cursor: "pointer" }}
            overflow="clip"
          >
            <Icon as={PictureAsPdf} color="red.200" />
            <Text ml="2" fontSize="sm" mr="2" pr="2">
              {file?.name}
            </Text>
          </Flex>

          {/**  access level */}

          <Flex w="full">
            <Tag
              size="md"
              borderRadius="full"
              variant="subtle"
              colorScheme={"cyan"}
            >
              <TagLabel>{ACCESS_LEVELS[file?.access_level]}</TagLabel>
            </Tag>
          </Flex>

          {/**  last modified */}
          <Flex w="full">
            <Text ml="2" fontSize="sm">
              {dayjs(file?.updated).format(DATE_FORMAT)}
            </Text>
          </Flex>

          {/** uploaded by */}
          <Flex w={"full"}>
            <Text ml="2" fontSize="sm">
              {file?.uploaded_by?.email}
            </Text>
          </Flex>

          {/** Action / Menu */}

          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<FaEllipsisV />}
              variant="outline"
            />
            <MenuList>
              <MenuItem
                icon={<FaUser />}
                command="⌘T"
                onClick={() => history.push(`/files/${file?.uuid}`)}
              >
                File details
              </MenuItem>
              <MenuItem
                icon={<FaEdit />}
                command="⌘O"
                onClick={handleClickOpen}
              >
                Open File...
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </ListItem>

      {open && (
        <FullScreenDialog
          open={open}
          handleClose={handleClose}
          file={file}
          pdfFile={`${file.document}`}
        />
      )}
    </>
  );
}
