import { routes } from "@/config/siteConfig";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IosShareIcon from "@mui/icons-material/IosShare";
import { Box, IconButton } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

type RoomHeader = {
  imageUrl: string;
  title: string;
};
const RoomHeader = ({ imageUrl, title }: RoomHeader) => {
  const router = useRouter();
  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          paddingTop: "56.25%",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            display: { xs: "flex", sm: "flex", md: "none" },
            justifyContent: "space-between",
            width: "100%",
            px: 2,
            top: 10,
            zIndex: 9999,
          }}
        >
          <IconButton
            sx={{
              backgroundColor: "common.white",
              color: "common.black",
              pl: ".7rem",
              "&:hover": {
                backgroundColor: "common.white",
                transform: "scale(1.1)",
              },
            }}
            onClick={() => router.push(routes.home)}
          >
            <ArrowBackIosIcon />
          </IconButton>

          <Box sx={{ display: "flex", gap: 2 }}>
            <IconButton
              sx={{
                backgroundColor: "common.white",
                color: "common.black",
                "&:hover": {
                  backgroundColor: "common.white",
                  transform: "scale(1.1)",
                },
              }}
            >
              <IosShareIcon sx={{ color: "common.black" }} />
            </IconButton>
            <IconButton
              sx={{
                backgroundColor: "common.white",
                color: "common.black",
                "&:hover": {
                  backgroundColor: "common.white",
                  transform: "scale(1.1)",
                },
              }}
            >
              <FavoriteBorderIcon sx={{ color: "common.black" }} />
            </IconButton>
          </Box>
        </Box>
        <Image fill src={imageUrl} alt={`${title}'s image`} />
      </Box>
    </>
  );
};

export default RoomHeader;
