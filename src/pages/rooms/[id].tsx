import getAllReservations from "@/actions/getAllReservations";
import getAllRoomsIds from "@/actions/getAllRoomsIds";
import getRoomById from "@/actions/getRoomById";
import LocationInfo from "@/components/rooms/LocationInfo";
import MobileRoomBar from "@/components/rooms/MobileRoomBar";
import ReservationSummary from "@/components/rooms/ReservationSummary";
import RoomDetailInfo from "@/components/rooms/RoomDetailInfo";
import RoomHeader from "@/components/rooms/RoomHeader";
import RoomHeaderInfo from "@/components/rooms/RoomHeaderInfo";
import RoomReservation from "@/components/rooms/RoomReservation";
import useIsMobile from "@/hooks/useIsMobile";
import { createReservationRequestValidator } from "@/libs/apiRequestValidators";
import { SafeReservation, SafeRoom } from "@/types";
import { Box, Container, Divider, Paper } from "@mui/material";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useRouter as useRouterik } from "next/router";
import { useState } from "react";
import { Range } from "react-date-range";
import { toast } from "react-hot-toast";
import { z } from "zod";

type PayloadRequest = z.infer<typeof createReservationRequestValidator>;

type PageProps = {
  room: SafeRoom;
  reservations: SafeReservation[];
};

export default function Page({ room, reservations }: PageProps) {
  const router = useRouter();
  const routerik = useRouterik();
  const isMobile = useIsMobile();
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const onSubmit = () => {
    const payload: PayloadRequest = {
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      roomId: room.id,
    };
    axios
      .post("/api/create-reservation", payload)
      .then(() => {
        toast.success("Reservation was successful!");
        setTimeout(() => {
          router.refresh();
        }, 500);
      })
      .catch(() => {
        toast.error("Something get wrong!");
      });
  };

  return (
    <>
      <Head>
        <title>{room.title}</title>
        <meta name="description" content={room.description} />

        <meta property="og:title" content={room.title} key="title" />
        <meta
          property="og:description"
          content={room.description}
          key="description"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={routerik.asPath} />
        <meta property="og:image" content={room.imageUrl} />
      </Head>
      <main>
        {isMobile && (
          <RoomHeader
            title={room.title}
            imageUrl={room.imageUrl}
            imagePlaceholder={room.imagePlaceholder}
            roomId={room.id}
          />
        )}

        <Container sx={{ mt: 2, pb: 8 }}>
          {!isMobile && (
            <RoomHeaderInfo
              title={room.title}
              locationValue={room.locationValue}
              roomId={room.id}
            />
          )}
          {isMobile ? (
            <RoomHeaderInfo
              title={room.title}
              locationValue={room.locationValue}
              roomId={room.id}
            />
          ) : (
            <RoomHeader
              title={room.title}
              imageUrl={room.imageUrl}
              imagePlaceholder={room.imagePlaceholder}
              roomId={room.id}
            />
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
                    borderRadius: "1.5rem",
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  }}
                >
                  <ReservationSummary
                    price={room.price}
                    dateRange={dateRange}
                    onSubmit={onSubmit}
                  />
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
