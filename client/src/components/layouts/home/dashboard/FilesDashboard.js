import React from "react";
import { GridItem } from "@chakra-ui/react";
import FileListHeader from "./FileListHeader";
import FileList from "./FileList";
import { scrollbarCss } from "utils/theme";
import { useFileList } from "../../../../api/handler/files";
import Loading from "../../../items/Loading";
import { useFilteredData } from "../../../../hooks/useFilterData";

export default function FilesDashboard() {
  const { data: files, isLoading } = useFileList();

  const { filteredData, handleSearch } = useFilteredData(files);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <FileListHeader handleSearch={handleSearch} />
      <GridItem
        gridColumn={3}
        gridRow={"2"}
        bg="brandGray.light"
        mr="5px"
        display="flex"
        overflowY="auto"
        css={scrollbarCss}
      >
        <FileList files={filteredData || files} />
      </GridItem>
    </>
  );
}
