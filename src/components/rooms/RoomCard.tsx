import { routes } from "@/config/siteConfig";
import useCountries from "@/hooks/useCountries";
import useFavorite from "@/hooks/useFavorite";
import { SafeRoom, SafeUser } from "@/types";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import { Box, Checkbox, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

type FavoriteButtonProps = {
  roomId: string;
  currentUser?: SafeUser | null;
};
const FavoriteButtonWithUser = ({
  roomId,
  currentUser,
}: FavoriteButtonProps) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    roomId,
    currentUser,
  });

  const handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    toggleFavorite(event);
  };

  return (
    <Box
      sx={{ position: "absolute", right: 10, top: 10, zIndex: 10 }}
      onClick={(event) => event.stopPropagation()}
    >
      <Checkbox
        icon={<FavoriteTwoToneIcon sx={{ color: "common.white" }} />}
        checkedIcon={<FavoriteIcon sx={{ color: "primary.main" }} />}
        checked={hasFavorited}
        onChange={handleClick}
      />
    </Box>
  );
};

type CarouselListingCardProps = {
  currentUser?: SafeUser | null;
  data: SafeRoom;
};

const CarouselRoomCard = ({ currentUser, data }: CarouselListingCardProps) => {
  const { getByValue } = useCountries();

  const locationLabel = getByValue(data.locationValue)?.label;

  const router = useRouter();
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
          width: "100%",
          paddingTop: "56.25%",
        }}
      >
        <Image
          src={data.imageUrl}
          alt={data.title}
          placeholder="blur"
          blurDataURL={data.imagePlaceholder || "/public/placeholder.jpg"}
          fill
          priority={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Box>
      <FavoriteButtonWithUser currentUser={currentUser} roomId={data.id} />
      <Box sx={{ mt: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            component="h3"
            sx={{ fontSize: "1.2rem", fontWeight: "500" }}
          >
            {locationLabel}
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
