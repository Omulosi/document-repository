import React from "react";

export function useFilteredData(data) {
  const [filteredData, setFilteredData] = React.useState([]);

  React.useState(() => {
    setFilteredData(data);
  }, [data]);

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];

    result = data?.filter((data) => {
      return data?.name?.toLocaleLowerCase().search(value) !== -1;
    });

    setFilteredData(result);
  };

  let resultList = filteredData || data;

  // sort by most recent
  resultList?.sort((a, b) => new Date(b.updated) - new Date(a.updated));

  return { filteredData: resultList, handleSearch };
}
