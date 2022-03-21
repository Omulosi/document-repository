import { Box, GridItem, useDisclosure } from "@chakra-ui/react";
import AddFileModal from "components/modals/AddFileModal";
import AddGuildIcon from "components/sections/AddGuildIcon";
import HomeIcon from "components/sections/HomeIcon";
import React from "react";
import guildScrollbarCss from "./css/GuildScrollerCSS";
import { useCurrentUser } from "../../../api/handler/users";

export default function GuildList() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: currentUser } = useCurrentUser();

  const isAdmin = currentUser?.role === 1;

  return (
    <GridItem
      gridColumn={1}
      gridRow={"1 / 4"}
      bg="brandGray.darker"
      overflowY="auto"
      css={guildScrollbarCss}
      zIndex={2}
    >
      <HomeIcon />
      {isAdmin && <AddGuildIcon onOpen={onOpen} />}
      {isOpen && <AddFileModal isOpen={isOpen} onClose={onClose} />}
      <Box h="20px" />
    </GridItem>
  );
}
