import { Box, Skeleton } from "@mui/material";

const RoomCardSkeleton = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        cursor: "pointer",
      }}
    >
      <Skeleton variant="rectangular" sx={{ paddingTop: "56.25%" }} />
      <Box sx={{ mt: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Skeleton variant="text" width="70%" sx={{ fontSize: "2rem" }} />
          <Skeleton variant="text" width="10%" />
        </Box>
        <Skeleton variant="text" width="60%" />
        <Box sx={{ display: "flex", gap: 1 }}>
          <Skeleton variant="text" width="60%" />
        </Box>
      </Box>
    </Box>
  );
};

export default RoomCardSkeleton;
