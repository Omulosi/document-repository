import React from "react";
import { GridItem } from "@chakra-ui/react";
import UserListHeader from "./UserListHeader";
import UserList from "./UserList";
import { scrollbarCss } from "utils/theme";
import { useUserList } from "../../../../api/handler/users";
import Loading from "../../../items/Loading";
import { useFilteredData } from "../../../../hooks/useFilterData";

export default function UsersDashboard() {
  const { data: users, isLoading } = useUserList();

  // assumes search field is called name
  const { filteredData, handleSearch } = useFilteredData(users);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <UserListHeader handleSearch={handleSearch} />
      <GridItem
        gridColumn={3}
        gridRow={"2"}
        bg="brandGray.light"
        mr="5px"
        display="flex"
        overflowY="auto"
        css={scrollbarCss}
      >
        <UserList users={filteredData || users} />
      </GridItem>
    </>
  );
}
