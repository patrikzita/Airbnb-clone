import { categories } from "@/utils/categories";
import StarRateIcon from "@mui/icons-material/StarRate";
import { Avatar, Box, Divider, Typography } from "@mui/material";

type RoomInfoProps = {
  username: string;
  userImg: string;
  guestCount: number;
  roomsCount: number;
  category: string;
  title: string;
};
const RoomInfo = ({
  username,
  userImg,
  guestCount,
  roomsCount,
  category,
  title,
}: RoomInfoProps) => {
  const categoryItem = categories.find(
    (categoryItem) => categoryItem.label === category
  );
  const CategoryIcon = categoryItem ? categoryItem.icon : null;

  const formatGuestAndRoomCount = (guestCount: number, roomsCount: number) => {
    const guests = guestCount > 1 ? "guests" : "guest";
    const rooms = roomsCount > 1 ? "rooms" : "room";
    return `${guestCount} ${guests} · ${roomsCount} ${rooms}`;
  };
  return (
    <Box>
      <Typography variant="h6" component="h1">
        {title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Typography component="h5">5</Typography>
        <StarRateIcon sx={{ fontSize: "1.3rem" }} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">{`Room in a rental unit hosted by ${username}`}</Typography>
        <Avatar alt={username} src={userImg} />
      </Box>
      <Typography>{formatGuestAndRoomCount(guestCount, roomsCount)}</Typography>
      <Divider sx={{ mt: 2 }} />
      <Box sx={{ display: "flex", alignItems: "center", gap: 3, py: 2 }}>
        {CategoryIcon && (
          <CategoryIcon sx={{ fontSize: "2rem", color: "grey.700" }} />
        )}
        <Typography variant="h6">{category}</Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />
    </Box>
  );
};

export default RoomInfo;