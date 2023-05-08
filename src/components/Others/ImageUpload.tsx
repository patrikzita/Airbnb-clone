import { OurFileRouter } from "@/libs/uploadthing";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, IconButton, Paper, Stack, Typography } from "@mui/material";
import { generateReactHelpers } from "@uploadthing/react";

type ImageUploadProps = {
  nextStep: () => void;
  previousStep: () => void;
  onSetImage: (value: string) => void;
};

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

const ImageUpload = ({
  nextStep,
  previousStep,
  onSetImage,
}: ImageUploadProps) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    files,
    startUpload,
    resetFiles,
  } = useUploadThing("imageUploader");

  const handleUpload = async () => {
    const uploadedFiles = await startUpload();
    if (uploadedFiles && uploadedFiles.length > 0) {
      uploadedFiles.forEach((uploadedFile) => {
        onSetImage(uploadedFile.fileUrl);
      });
    } else {
      console.error("Failed to obtain image URLs.");
    }
  };

  return (
    <>
      <Paper
        {...getRootProps()}
        sx={{
          minHeight: 200,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <input {...getInputProps()} />
        {isDragActive && files.length === 0 ? (
          <Typography variant="h6">Drop files here...</Typography>
        ) : files.length === 0 ? (
          <Typography variant="h6">Click or drag files to upload</Typography>
        ) : (
          <Typography variant="h6">
            {`${files.length} file${
              files.length > 1 ? "s" : ""
            } added, not yet uploaded`}
          </Typography>
        )}

        {files.length > 0 && (
          <IconButton
            onClick={resetFiles}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
            }}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </Paper>

      {files.length > 0 && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleUpload()}
          sx={{
            flexGrow: 1,
            borderRadius: 2,
            paddingY: 1,
          }}
        >
          Upload {files.length} files
        </Button>
      )}
      <Stack direction="row" gap={2} marginTop={2}>
        <Button
          variant="outlined"
          color="secondary"
          sx={{
            width: "100%",
            borderRadius: 2,
            paddingY: 1,
          }}
          onClick={previousStep}
        >
          Back
        </Button>
        <Button
          variant="contained"
          sx={{
            width: "100%",
            borderRadius: 2,
            paddingY: 1,
          }}
          onClick={nextStep}
        >
          Next
        </Button>
      </Stack>
    </>
  );
};

export default ImageUpload;
