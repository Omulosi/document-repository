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
  Tr,
  Td,
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
      <Tr
        _hover={{
          bg: "brandGray.dark",
        }}
      >
        <Td>
          <Flex align="center" w="full" _hover={{ cursor: "pointer" }}>
            <Icon as={PictureAsPdf} color="red.200" />
            <Text ml="2" fontSize="sm" mr="1" pr="1" maxWidth="64">
              {file?.name}
            </Text>
          </Flex>
        </Td>

        <Td>
          <Tag
            size="md"
            borderRadius="full"
            variant="subtle"
            colorScheme={"cyan"}
          >
            <TagLabel>{ACCESS_LEVELS[file?.access_level]}</TagLabel>
          </Tag>
        </Td>

        <Td>
          <Text ml="2" fontSize="sm">
            {dayjs(file?.updated).format(DATE_FORMAT)}
          </Text>
        </Td>

        <Td>
          <Text ml="2" fontSize="sm">
            {file?.uploaded_by?.email}
          </Text>
        </Td>

        <Td>
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
        </Td>
      </Tr>

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
