import React from "react";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import StarRateIcon from "@mui/icons-material/StarRate";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { Listing, User } from "@prisma/client";
import { formatDate } from "@/utils/formatDate";
import { formatCurrency } from "@/utils/formatCurrency";
import useFavorite from "@/hooks/useFavorite";

type FavoriteButtonProps = {
  listingId: string;
  currentUser?: User | null;
};
const FavoriteButton = ({ listingId, currentUser }: FavoriteButtonProps) => {
  console.log("CurrentUser in FavoriteButton:", currentUser);

  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
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
          <FavoriteBorderIcon />
        )}
      </IconButton>
    </Box>
  );
};

type SafeDataListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

type CarouselListingCardProps = {
  currentUser?: User | null;
  data: SafeDataListing;
};

const CarouselListingCard = ({
  currentUser,
  data,
}: CarouselListingCardProps) => {
  const [activeStep, setActiveStep] = React.useState(0);

  const maxSteps = data.imageUrl.length;
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
      sx={{
        flexGrow: 1,
        position: "relative",
      }}
    >
      <Box
        component="img"
        sx={{
          height: 275,
          display: "block",
          overflow: "hidden",
          width: "100%",
          borderRadius: 5,
        }}
        src={data.imageUrl}
        alt={""}
      />
      <FavoriteButton currentUser={currentUser} listingId={data.id} />
      <Box sx={{ mt: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            component="h3"
            sx={{ fontSize: "1.2rem", fontWeight: "500" }}
          >
            {" "}
            {data.locationValue}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
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

export default CarouselListingCard;
