import { OurFileRouter } from "@/libs/uploadthing";
import { Paper } from "@mui/material";
import { UploadButton } from "@uploadthing/react";
import { toast } from "react-hot-toast";


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
            console.log("Files: ", res);
            toast.success("Upload completed.");
            if (res && res.length > 0) {
              onSetImage(res[0].fileUrl);
            } else {
              console.error("Upload completed, but no files were returned");
            }
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
          }}
        />
      </Paper>
    </>
  );
};

export default ImageUpload;
