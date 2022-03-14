import { Box, GridItem, Text, UnorderedList } from "@chakra-ui/react";
import SidebarButton from "components/sections/SidebarButton";
import React from "react";
import AccountBar from "../AccountBar";
import dmScrollerCss from "./css/dmScrollerCSS";
import { FiUsers, FiFile } from "react-icons/fi";
import { useCurrentUser } from "../../../api/handler/users";

export default function Sidebar() {
  const { data: user, isLoading } = useCurrentUser();

  const isAdmin = user?.role === 1;

  return (
    <GridItem
      gridColumn={"2"}
      gridRow={"1 / 4"}
      bg="brandGray.dark"
      overflowY="hidden"
      _hover={{ overflowY: "auto" }}
      css={dmScrollerCss}
    >
      {/** files */}
      <SidebarButton linkTo="/home" title="Files" icon={FiFile} />

      {/** users - only admin can see this */}
      {isAdmin && (
        <SidebarButton linkTo="/users" title="Users" icon={FiUsers} />
      )}

      <AccountBar />
    </GridItem>
  );
}
