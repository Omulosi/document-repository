import { Box } from "@chakra-ui/react";
import React from "react";

export function ActiveGuildPill() {
  return (
    <Box
      w={"8px"}
      h={"40px"}
      bg={"white"}
      position={"absolute"}
      borderRadius={"0 4px 4px 0"}
      ml={"-4px"}
      left={0}
      mt={"4px"}
    />
  );
}

export function HoverGuildPill() {
  return (
    <Box
      w={"8px"}
      h={"24px"}
      bg={"white"}
      position={"absolute"}
      borderRadius={"0 4px 4px 0"}
      ml={"-4px"}
      left={0}
      mt={"12px"}
    />
  );
}
