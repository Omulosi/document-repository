import {
  Avatar,
  AvatarBadge,
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
} from "@chakra-ui/react";
import React from "react";
import { FaEllipsisV, FaUser } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { ACCESS_LEVELS } from "../../config";

export default function UserListItem({ user }) {
  const history = useHistory();

  return (
    <ListItem
      p="3"
      mx="3"
      _hover={{
        bg: "brandGray.dark",
        borderRadius: "5px",
      }}
    >
      <Flex align="center" justify="space-between">
        {/** Name */}
        <Flex align="center" w={"full"} _hover={{ cursor: "pointer" }}>
          <Avatar size="sm" src={user?.image}>
            <AvatarBadge
              boxSize="1.25em"
              bg={user.isOnline ? "green.500" : "gray.500"}
            />
          </Avatar>
          <Text ml="2" fontSize="sm">
            {user?.name}
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
            <TagLabel>{ACCESS_LEVELS[user?.access_level]}</TagLabel>
          </Tag>
        </Flex>

        {/** status  */}
        <Flex w="full">
          <Tag
            size="md"
            borderRadius="full"
            variant="solid"
            colorScheme={user.is_active ? "green" : "red"}
          >
            <TagLabel>{user.is_active ? "Active" : "Inactive"}</TagLabel>
          </Tag>
        </Flex>

        {/** menu */}

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
              onClick={() => history.push(`/users/${user?.pk}`)}
            >
              View user
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </ListItem>
  );
}
