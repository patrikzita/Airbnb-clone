import useCountries from "@/hooks/useCountries";
import useIsMobile from "@/hooks/useIsMobile";
import IosShareIcon from "@mui/icons-material/IosShare";
import StarRateIcon from "@mui/icons-material/StarRate";
import { Box, Button, Typography } from "@mui/material";
import { FavoriteButton } from "../FavoriteButton";

type RoomInfoProps = {
  title: string;
  locationValue: string;
  roomId: string;
};
const RoomHeaderInfo = ({ title, locationValue, roomId }: RoomInfoProps) => {
  const { getByValue } = useCountries();
  const locationLabel = getByValue(locationValue)?.label;
  const isMobile = useIsMobile();
  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          my: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <StarRateIcon sx={{ fontSize: "1.3rem" }} />
          <Typography component="span">5</Typography>
          <Typography component="span" sx={{ mx: 1 }}>
            ·
          </Typography>
          <Typography component="span">151 reviews</Typography>
          <Typography component="span" sx={{ mx: 1 }}>
            ·
          </Typography>
          <Typography component="span">{locationLabel}</Typography>
        </Box>
        {!isMobile && (
          <Box>
            <Button
              variant="text"
              color="secondary"
              startIcon={<IosShareIcon />}
            >
              Share
            </Button>
            <FavoriteButton roomId={roomId} label="Save" />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default RoomHeaderInfo;
