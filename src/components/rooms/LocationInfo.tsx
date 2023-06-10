import useCountries from "@/hooks/useCountries";
import { Box, Divider, Typography } from "@mui/material";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("../Others/Map"), {
  ssr: false,
});

type LocationInfoProps = {
  locationValue: string;
};

const LocationInfo = ({ locationValue }: LocationInfoProps) => {
  const { getByValue } = useCountries();

  const locationDetails = getByValue(locationValue);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Typography variant="h5" fontWeight={600}>
        Where you´ll be
      </Typography>
      <Typography variant="subtitle1">{locationDetails?.label}</Typography>
      <Map center={locationDetails?.latlng} />
      <Divider sx={{ mb: 2 }} />
    </Box>
  );
};
export default LocationInfo;
