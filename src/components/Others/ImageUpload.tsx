import { OurFileRouter } from "@/libs/uploadthing";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, IconButton, Paper, Typography } from "@mui/material";
import { UploadButton } from "@uploadthing/react";

type ImageUploadProps = {
  onSetImage: (value: string) => void;
};

const ImageUpload: React.FC<ImageUploadProps> = ({ onSetImage }) => {
  return (
    <>
      <Paper
        sx={{
          minHeight: 200,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <UploadButton<OurFileRouter>
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            // Do something with the response
            console.log("Files: ", res);
            alert("Upload Completed");
            // Set the image URL after upload
            if (res && res.length > 0) {
              // Set the image URL after upload
              onSetImage(res[0].fileUrl);
            } else {
              console.error("Upload completed, but no files were returned");
            }
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
      </Paper>
    </>
  );
};

export default ImageUpload;
