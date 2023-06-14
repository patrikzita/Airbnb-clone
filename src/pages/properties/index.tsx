import getCurrentUser from "@/actions/getCurrentUser";
import getUserRoomsData from "@/actions/getUserRoomsData";
import CustomHead from "@/components/Others/CustomHead";
import StateMessage from "@/components/Others/StateMessage";
import MainContent from "@/components/layouts/MainContent";
import CarouselRoomCard from "@/components/rooms/RoomCard";
import { SafeRoom, SafeUser } from "@/types";
import { Box, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "react-hot-toast";

type PropertiesProps = {
  currentUser: SafeUser;
  userRooms: SafeRoom[]
};

const PropertiesPage = ({ currentUser, userRooms }: PropertiesProps) => {
  if (!currentUser) {
    return (<CustomHead title="Properties - Airbnb" description="Managing your properties ">
      <StateMessage title="Unauthorized" subtitle="You´ve to be login, if you want to manage your properties." showLoginButton />
    </CustomHead>)
  }
  if (userRooms.length === 0) {
    return (<CustomHead title="Your lists - Properties - Airbnb" description="Managing your properties ">
      <StateMessage title="No trips found" subtitle="Looks like you haven't reserved any trips." />
    </CustomHead>)
  }

  const router = useRouter();
  const onDelete = useCallback((id: string) => {
    axios.delete("/api/delete-room", {
      params: { roomId: id }
    })
      .then(() => {
        toast.success('Rooom deleted!');
        router.refresh();
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error)
      })
  }, [router]);

  return (
    <CustomHead title="Your lists - Properties - Airbnb" description="Managing your properties">
      <MainContent>
        <Typography variant="h4" component="h1" marginY={4}>
          Manage My Properties
        </Typography>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{
            justifyContent: { xs: "center", md: "flex-start" },
          }}
        >
          {userRooms.map((room) => (
            <Grid item xs={12} sm={6} md={4} key={room.id}>
              <CarouselRoomCard
                key={room.id}
                room={room}
                showDeleteButton
                onDelete={onDelete}
              />
            </Grid>
          ))}
        </Grid>
      </MainContent>
    </CustomHead >
  );
};
export default PropertiesPage;

export async function getServerSideProps({ req, res }: any) {
  const currentUser = await getCurrentUser(req, res);
  const userRooms = await getUserRoomsData(currentUser?.id)

  return {
    props: {
      currentUser,
      userRooms,
    },
  };
}
