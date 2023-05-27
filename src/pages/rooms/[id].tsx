import getAllRoomsIds from "@/actions/getAllRoomsIds";
import getRoomById from "@/actions/getRoomById";
import LocationInfo from "@/components/shared/rooms/LocationInfo";
import MobileRoomBar from "@/components/shared/rooms/MobileRoomBar";
import RoomHeader from "@/components/shared/rooms/RoomHeader";
import RoomInfo from "@/components/shared/rooms/RoomInfo";
import RoomReservation from "@/components/shared/rooms/RoomReservation";
import useIsMobile from "@/hooks/useIsMobile";
import { Container } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Range } from "react-date-range";
import { toast } from "react-hot-toast";
/* 
 TODO: Pořešit vytváření rezervace
 */
export default function Page({ room }: any) {
  const isMobile = useIsMobile();
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [totalPrice, setTotalPrice] = useState<number>(1);

  const onSubmit = () => {
    axios
      .post("/api/create-reservation", {
        totalPrice,
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

  return (
    <>
      <main>
        <RoomHeader title={room.title} imageUrl={room.imageUrl} />
        <Container sx={{ mt: 2, pb: 8 }}>
          <RoomInfo
            title={room.title}
            username={room.user.name}
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
          />
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
  return {
    props: {
      room,
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
