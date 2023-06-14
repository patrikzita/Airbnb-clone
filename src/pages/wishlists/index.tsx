import getCurrentUser from "@/actions/getCurrentUser";
import getFavoriteUserRoom from "@/actions/getFavoriteUserRoom";
import CustomHead from "@/components/Others/CustomHead";
import StateMessage from "@/components/Others/StateMessage";
import MainContent from "@/components/layouts/MainContent";
import CarouselRoomCard from "@/components/rooms/RoomCard";
import { SafeRoom, SafeUser } from "@/types";
import { Grid, Typography } from "@mui/material";

type WishlistsProps = {
  favoriteRooms: SafeRoom[];
  currentUser: SafeUser;
};

const Wishlists = ({ favoriteRooms, currentUser }: WishlistsProps) => {

  if (!currentUser) {
    return (
      <CustomHead title="Wishlists - Airbnb" description="Keep track of your favourite properties and find them easily when planning your next holiday.">
        <StateMessage title="Unauthorized" subtitle="You´ve to be login, if you want to manage your properties." showLoginButton />
      </CustomHead>)
  }
  if (favoriteRooms.length === 0) {
    return (
      <CustomHead title="Wishlists - Airbnb" description="Keep track of your favourite properties and find them easily when planning your next holiday.">
        <StateMessage title="No wish room found" subtitle="Looks like you haven't favorite properties." />
      </CustomHead>)
  }

  return (
    <CustomHead title="Wishlists - Airbnb" description="Keep track of your favourite properties and find them easily when planning your next holiday.">
      <MainContent>
        <Typography variant="h4" component="h1">
          Wishlists
        </Typography>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{
            justifyContent: { xs: "center", md: "flex-start" },
          }}
        >
          {favoriteRooms.map((room) => (
            <Grid item xs={12} sm={6} md={4} key={room.id}>
              <CarouselRoomCard
                key={room.id}
                room={room}
                currentUser={currentUser}
              />
            </Grid>
          ))}
        </Grid>
      </MainContent>
    </CustomHead>

  );
};
export default Wishlists;

export async function getServerSideProps({ req, res }: any) {
  const favoriteRooms = await getFavoriteUserRoom(req, res);
  const currentUser = await getCurrentUser(req, res);
  return {
    props: {
      favoriteRooms,
      currentUser,
    },
  };
}
