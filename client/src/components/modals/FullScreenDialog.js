import * as React from "react";
import { Close as CloseIcon } from "@material-ui/icons";
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Slide,
  Box,
  Typography,
} from "@material-ui/core";
import PdfViewer from "../items/PdfViewer";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ open, handleClose, file }) {
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <Box bgcolor="#1b1c1d" style={{ height: "100vh" }}>
        <AppBar style={{ position: "relative", background: "#202225" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography>{file?.name}</Typography>
          </Toolbar>
        </AppBar>

        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "95%",
          }}
        >
          <PdfViewer pdfFile={`${file?.document}`} />
        </Box>
      </Box>
    </Dialog>
  );
}
