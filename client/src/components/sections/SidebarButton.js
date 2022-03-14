import { Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import homeStore from "stores/homeStore";
import { PingIcon } from "components/shared/NotificationIcon";

export default function SidebarButton({ linkTo = "", title = "", icon }) {
  const currentPath = `${linkTo}`;
  const location = useLocation();
  const isActive = location.pathname === currentPath;

  return (
    <Link to={linkTo}>
      <Flex
        m="2"
        p="3"
        align="center"
        justify={"space-between"}
        color={isActive ? "#fff" : "brandGray.accent"}
        _hover={{
          bg: "brandGray.light",
          borderRadius: "5px",
          cursor: "pointer",
          color: "#fff",
        }}
        bg={isActive ? "brandGray.active" : undefined}
      >
        <Flex align={"center"}>
          <Icon as={icon} fontSize="20px" />
          <Text fontSize="14px" ml="4" fontWeight="semibold">
            {title}
          </Text>
        </Flex>
      </Flex>
    </Link>
  );
}
