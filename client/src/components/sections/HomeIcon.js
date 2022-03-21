import { Divider, Flex, Icon } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaFileArchive } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { ActiveGuildPill, HoverGuildPill } from "components/shared/GuildPills";
import StyledTooltip from "./StyledTooltip";

export default function HomeIcon() {
  const location = useLocation();
  const isActive = location.pathname === "/home";
  const [isHover, setHover] = useState(false);

  return (
    <StyledTooltip label={"Home"} position={"right"}>
      <Flex direction="column" my="2" align="center">
        {isActive && <ActiveGuildPill />}
        {isHover && <HoverGuildPill />}
        <Link to="/home">
          <Flex
            direction="column"
            m="auto"
            align="center"
            justify="center"
            bg={isActive ? "highlight.standard" : "brandGray.light"}
            borderRadius={isActive ? "35%" : "50%"}
            h="48px"
            w="48px"
            color="white"
            position={"relative"}
            _hover={{
              cursor: "pointer",
              borderRadius: "35%",
              bg: "highlight.standard",
            }}
            onMouseLeave={() => setHover(false)}
            onMouseEnter={() => setHover(true)}
          >
            <Icon as={FaFileArchive} />
          </Flex>
        </Link>
        <Divider mt="2" w="40px" />
      </Flex>
    </StyledTooltip>
  );
}
