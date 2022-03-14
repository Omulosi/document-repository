import React from "react";
import FileUploadDialogItem from "../items/FileUploadDialogItem";
import { useUploadFileResource } from "../../api/handler/files";

export default function AddFileModal({ isOpen, onClose }) {
  const submitClose = () => {
    onClose();
  };

  const mutation = useUploadFileResource();

  const handleUploadFile = (files) => {
    let formData = new FormData();
    files.forEach((file) => {
      formData.append("file", file);
    });

    mutation.mutate(formData);
  };

  return (
    <FileUploadDialogItem
      open={isOpen}
      handleClose={submitClose}
      handleSubmit={handleUploadFile}
    />
  );
}
