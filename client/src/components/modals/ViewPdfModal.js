import {
  Avatar,
  Box,
  Button,
  Flex,
  Input,
  LightMode,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import PdfViewer from "../items/PdfViewer";

export default function ViewPdfModal({ pdfFile, isOpen, onClose }) {
  console.log({ pdfFile });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent w="max-content">
        <ModalCloseButton />
        <ModalBody p={6} w="full">
          <PdfViewer pdfFile={pdfFile} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
