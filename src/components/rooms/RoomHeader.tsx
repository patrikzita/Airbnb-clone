import { routes } from "@/config/siteConfig";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import IosShareIcon from "@mui/icons-material/IosShare";
import { Box, IconButton, styled } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FavoriteButton } from "./FavoriteButton";

type RoomHeader = {
  imageUrl: string;
  imagePlaceholder?: string | null;
  title: string;
  roomId: string;
};

const StyledImage = styled(Image)(({ theme }) => ({
  borderRadius: "2rem",
  [theme.breakpoints.down("md")]: {
    borderRadius: 0,
  },
}));

const RoomHeader = ({
  imageUrl,
  title,
  roomId,
  imagePlaceholder,
}: RoomHeader) => {
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
            <FavoriteButton roomId={roomId} />
          </Box>
        </Box>
        <StyledImage
          fill
          src={imageUrl}
          alt={`${title}'s image`}
          placeholder="blur"
          blurDataURL={imagePlaceholder || "/public/placeholder.jpg"}
        />
      </Box>
    </>
  );
};

export default RoomHeader;
