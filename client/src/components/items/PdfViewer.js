import React, { useState } from "react";
import { Document, Page, Outline } from "react-pdf";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import { Text, Flex, GridItem, Box } from "@chakra-ui/react";
import { scrollbarCss } from "utils/theme";

const file = "http://localhost:8000/media/documents/AJR.pdf";

export default function PdfViewer({ pdfFile }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <Box css={scrollbarCss}>
      <Document
        file={pdfFile}
        options={{ workerSrc: "/pdf.worker.js" }}
        onLoadSuccess={onDocumentLoadSuccess}
        onContextMenu={(e) => e.preventDefault()}
        className="pdf-container"
      >
        <Page pageNumber={pageNumber} />
      </Document>

      <div
        style={{
          color: "black",
          paddingLeft: "2em",
          paddingRight: "2em",
          position: "absolute",
          bottom: "1.5%",
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(200,200,200, 0.9)",
        }}
      >
        <Flex w="full" justify="center" align="center">
          <button
            disabled={pageNumber <= 1}
            type="button"
            onClick={previousPage}
          >
            <ChevronLeft />
          </button>
          <Text fontSize="sm">
            {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
          </Text>
          <button
            type="button"
            disabled={pageNumber >= numPages}
            onClick={nextPage}
          >
            <ChevronRight />
          </button>
        </Flex>
      </div>
    </Box>
  );
}

// .page-controls {
//   position: absolute;
//   bottom: 5%;
//   left: 50%;
//   background: white;
//   opacity: 0;
//   transform: translateX(-50%);
//   transition: opacity ease-in-out 0.2s;
//   box-shadow: 0 30px 40px 0 rgb(16 36 94 / 20%);
//   border-radius: 4px;
// }
