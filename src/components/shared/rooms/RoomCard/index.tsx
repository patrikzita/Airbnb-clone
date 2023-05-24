import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import React from "react";
import useFavorite from "@/hooks/useFavorite";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";
import { Room, User } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { routes } from "@/config/siteConfig";

type FavoriteButtonProps = {
  roomId: string;
  currentUser?: User | null;
};
const FavoriteButton = ({ roomId, currentUser }: FavoriteButtonProps) => {
  console.log("CurrentUser in FavoriteButton:", currentUser);

  const { hasFavorited, toggleFavorite } = useFavorite({
    roomId,
    currentUser,
  });

  return (
    <Box
      sx={{ position: "absolute", right: 10, top: 10, zIndex: 10 }}
      onClick={toggleFavorite}
    >
      <IconButton>
        {hasFavorited ? (
          <FavoriteIcon sx={{ color: "primary.main" }} />
        ) : (
          <FavoriteTwoToneIcon sx={{ color: "common.white" }} />
        )}
      </IconButton>
    </Box>
  );
};

type SafeDataListing = Omit<Room, "createdAt"> & {
  createdAt: string;
};

type CarouselListingCardProps = {
  currentUser?: User | null;
  data: SafeDataListing;
};

const CarouselRoomCard = ({ currentUser, data }: CarouselListingCardProps) => {
  const [activeStep, setActiveStep] = React.useState(0);

  const maxSteps = data.imageUrl.length;
  const router = useRouter();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1); // jumps when we click the next arrow
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1); // when we click the back arrow
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step); // handle swipe change
  };
  return (
    <Box
      className="carouselCard"
      onClick={() => router.push(`${routes.rooms}/${data.id}`)}
      sx={{
        flexGrow: 1,
        position: "relative",
        width: "100%",
        cursor: "pointer",
      }}
    >
      <Box
        sx={{
          position: "relative",
          height: { xs: "400px", sm: "280px", md: "280px" },
        }}
      >
        {/* 
        TODO: Opravit když obrázek nemá image + přidat sizes props
        */}
        <Image fill src={data.imageUrl} alt={data.title} />
      </Box>
      <FavoriteButton currentUser={currentUser} roomId={data.id} />
      <Box sx={{ mt: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            component="h3"
            sx={{ fontSize: "1.2rem", fontWeight: "500" }}
          >
            {data.locationValue}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Typography component="h5">5</Typography>
            <StarRateIcon sx={{ fontSize: "1.3rem" }} />
          </Box>
        </Box>
        <Typography component="h4">
          {`${formatDate(new Date(data.startDate))} - ${formatDate(
            new Date(data.endDate)
          )}`}
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Typography component="h5" sx={{ fontWeight: "600" }}>
            {formatCurrency(data.price)}
          </Typography>
          <Typography component="span">night</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CarouselRoomCard;
