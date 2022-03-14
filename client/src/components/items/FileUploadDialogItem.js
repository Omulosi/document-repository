import React from "react";
import { DropzoneDialog } from "material-ui-dropzone";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const FileUploadDialogItem = ({
  open,
  handleClose,
  handleSubmit,
  isLoading = false,
}) => {
  const history = useHistory();
  const uploadInProgress = React.useMemo(() => {
    return isLoading;
  }, [isLoading]);

  const handleUpload = (files) => {
    handleSubmit(files);
    handleClose();
    history.push("/files");
  };

  if (uploadInProgress) {
    return <div>is loading...</div>;
  }

  return (
    <DropzoneDialog
      acceptedFiles={[".pdf"]}
      cancelButtonText="cancel"
      submitButtonText="upload"
      filesLimit={3}
      maxFileSize={5000000000}
      open={open}
      onClose={handleClose}
      onSave={(files) => {
        handleUpload(files);
      }}
      showPreviews={true}
      showFileNamesInPreview={true}
      useChipsForPreview
    />
  );
};

export default FileUploadDialogItem;
