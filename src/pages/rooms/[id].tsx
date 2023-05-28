import getAllReservations from "@/actions/getAllReservations";
import getAllRoomsIds from "@/actions/getAllRoomsIds";
import getRoomById from "@/actions/getRoomById";
import LocationInfo from "@/components/shared/rooms/LocationInfo";
import MobileRoomBar from "@/components/shared/rooms/MobileRoomBar";
import RoomDetailInfo from "@/components/shared/rooms/RoomDetailInfo";
import RoomHeader from "@/components/shared/rooms/RoomHeader";
import RoomHeaderInfo from "@/components/shared/rooms/RoomHeaderInfo";
import RoomReservation from "@/components/shared/rooms/RoomReservation";
import useIsMobile from "@/hooks/useIsMobile";
import { SafeReservation, SafeRoom } from "@/types";
import { checkIfDatesAreEqual, getNightsBetween } from "@/utils/dateUtils";
import { formatCurrency } from "@/utils/formatCurrency";
import StarRateIcon from "@mui/icons-material/StarRate";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Range } from "react-date-range";
import { toast } from "react-hot-toast";

type PageProps = {
  room: SafeRoom;
  reservations: SafeReservation[];
};
export default function Page({ room, reservations }: PageProps) {
  const isMobile = useIsMobile();
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const onSubmit = () => {
    axios
      .post("/api/create-reservation", {
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        roomId: room.id,
      })
      .then(() => {
        toast.success("Reservation was successful!");
      })
      .catch(() => {
        toast.error("Something get wrong!");
      });
  };

  const nights = getNightsBetween(
    dateRange.startDate ?? new Date(),
    dateRange.endDate ?? new Date()
  );
  return (
    <>
      <main>
        {isMobile && <RoomHeader title={room.title} imageUrl={room.imageUrl} />}

        <Container sx={{ mt: 2, pb: 8 }}>
          {!isMobile && (
            <RoomHeaderInfo
              title={room.title}
              locationValue={room.locationValue}
            />
          )}
          {isMobile ? (
            <RoomHeaderInfo
              title={room.title}
              locationValue={room.locationValue}
            />
          ) : (
            <RoomHeader title={room.title} imageUrl={room.imageUrl} />
          )}
          <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
            <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 60%" } }}>
              {isMobile && <Divider />}
              <RoomDetailInfo
                userName={room.user.name}
                userImg={room.user.image}
                guestCount={room.guestCount}
                roomsCount={room.roomCount}
                category={room.category}
              />
              <LocationInfo locationValue={room.locationValue} />

              <RoomReservation
                locationValue={room.locationValue}
                startDate={room.startDate}
                endDate={room.endDate}
                dateRange={dateRange}
                setDateRange={setDateRange}
                onSubmit={onSubmit}
                reservations={reservations}
              />
            </Box>

            {!isMobile && (
              <Box
                sx={{
                  flex: { xs: "1 1 100%", md: "1 1 40%" },
                  padding: 4,
                }}
              >
                <Paper
                  sx={{
                    position: "sticky",
                    top: 150,
                  }}
                >
                  <Box
                    p={2}
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: nights >= 1 ? "row" : "column",
                        justifyContent:
                          nights >= 1 ? "space-between" : "flex-start",
                        alignItems: nights >= 1 ? "center" : "flex-start",
                      }}
                    >
                      <Box>
                        {nights >= 1 ? (
                          <>
                            <Typography
                              component="span"
                              sx={{
                                fontSize: "1.4rem",
                                fontWeight: 500,
                              }}
                            >
                              {formatCurrency(room.price)}
                            </Typography>
                            <Typography component="span" ml={1}>
                              night
                            </Typography>
                          </>
                        ) : (
                          <Typography
                            component="span"
                            sx={{
                              fontSize: "1.4rem",
                              fontWeight: 500,
                            }}
                          >
                            Add dates for prices
                          </Typography>
                        )}
                      </Box>
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
                      </Box>
                    </Box>
                    <Box>
                      <Button variant="contained" sx={{ width: "100%" }}>
                        Reserve
                      </Button>
                    </Box>
                    {nights >= 1 && (
                      <Box>
                        <Typography textAlign="center" my={1}>
                          You won't be charged yet
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Box>
                            <Typography>{`${formatCurrency(
                              room.price
                            )} x ${nights} ${
                              nights > 1 ? "nights" : "night"
                            }`}</Typography>
                          </Box>
                          <Typography>
                            {formatCurrency(room.price * nights)}
                          </Typography>
                        </Box>
                        <Divider />
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography>Total</Typography>
                          <Typography>
                            {formatCurrency(room.price * nights)}
                          </Typography>
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Paper>
              </Box>
            )}
          </Box>
        </Container>
      </main>
      {isMobile && (
        <MobileRoomBar
          price={room.price}
          dateRange={dateRange}
          onSubmit={onSubmit}
        />
      )}
    </>
  );
}
export async function getStaticProps({ params }: any) {
  const room = await getRoomById({ roomId: params.id });
  if (!room || !room.id) {
    return {
      notFound: true,
    };
  }
  const reservations = await getAllReservations({ roomId: room.id });
  return {
    props: {
      room,
      reservations,
    },
    revalidate: 60,
  };
}
export async function getStaticPaths() {
  const roomIds = await getAllRoomsIds();

  if (!roomIds) {
    return { paths: [], fallback: false };
  }
  const paths = roomIds.map((id) => ({
    params: { id: id.toString() },
  }));

  return { paths, fallback: false };
}
