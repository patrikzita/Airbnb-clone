import getCurrentUser from "@/actions/getCurrentUser";
import getUsersReservations from "@/actions/getUsersReservations";
import CustomHead from "@/components/Others/CustomHead";
import StateMessage from "@/components/Others/StateMessage";
import MainContent from "@/components/layouts/MainContent";
import { routes } from "@/config/siteConfig";
import { SafeReservation, SafeUser } from "@/types";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";
import StarRateIcon from "@mui/icons-material/StarRate";
import { Box, Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MouseEvent, useCallback, useState } from "react";
import { toast } from "react-hot-toast";

type PropertyCardProps = {
  reservation: SafeReservation;
};

const ReservationRoomCard = ({ reservation }: PropertyCardProps) => {
  const { title, imageUrl, imagePlaceholder } = reservation.room;
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onDelete = useCallback(
    (e: MouseEvent<HTMLButtonElement>, id: string) => {
      e.stopPropagation();
      setLoading(true);

      axios
        .delete("/api/delete-reservation", {
          params: { reservationId: id },
        })
        .then(() => {
          toast.success("Your reservation deleted!");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [router]
  );

  return (
    <Box
      className="carouselCard"
      onClick={() => router.push(`${routes.rooms}/${reservation.roomId}`)}
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
          src={imageUrl}
          alt={title}
          placeholder="blur"
          blurDataURL={imagePlaceholder || "/public/placeholder.jpg"}
          fill
          priority={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            component="h3"
            sx={{ fontSize: "1.2rem", fontWeight: "500" }}
          >
            {title}
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
      </Box>

      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <Typography>Total:</Typography>
        <Typography component="span" sx={{ fontWeight: "500" }}>
          {formatCurrency(reservation.totalPrice)}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <Typography>Reservation:</Typography>
        <Typography component="span" sx={{ fontWeight: "500" }}>
          {`${formatDate(new Date(reservation.startDate))} - ${formatDate(
            new Date(reservation.endDate)
          )}`}
        </Typography>
      </Box>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "error.main",
          width: "100%",
          mt: 2,
        }}
        disabled={loading}
        onClick={(e) => onDelete(e, reservation.id)}
      >
        Delete Reservation
      </Button>
    </Box>
  );
};

type PropertiesProps = {
  currentUser: SafeUser;
  userReservation: SafeReservation[];
};

const TripsPage = ({ currentUser, userReservation }: PropertiesProps) => {
  if (!currentUser) {
    return (
      <CustomHead
        title="Trips - Airbnb"
        description="Manage your upcoming and past trips and keep track of your booking details."
      >
        <StateMessage
          title="Unauthorized"
          subtitle="You´ve to be login, if you want to manage your trips."
          showLoginButton
        />
      </CustomHead>
    );
  }
  if (userReservation.length === 0) {
    return (
      <CustomHead
        title="Your Trips - Trips - Airbnb"
        description="Manage your upcoming and past trips and keep track of your booking details."
      >
        <StateMessage
          title="No trips found"
          subtitle="Looks like you haven't reserved any trips."
        />
      </CustomHead>
    );
  }

  return (
    <>
      <CustomHead
        title="Your Trips - Trips - Airbnb"
        description="Manage your upcoming and past trips and keep track of your booking details."
      >
        <MainContent>
          <Typography variant="h4" component="h1">
            Manage your Trips
          </Typography>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{
              justifyContent: { xs: "center", md: "flex-start" },
            }}
          >
            {userReservation.map((reservation) => (
              <Grid item xs={12} sm={6} md={4} key={reservation.room.id}>
                <ReservationRoomCard
                  key={reservation.room.id}
                  reservation={reservation}
                />
              </Grid>
            ))}
          </Grid>
        </MainContent>
      </CustomHead>
    </>
  );
};
export default TripsPage;

export async function getServerSideProps({ req, res }: any) {
  const currentUser = await getCurrentUser(req, res);
  const userReservation = await getUsersReservations({
    userId: currentUser?.id,
  });

  return {
    props: {
      currentUser,
      userReservation,
    },
  };
}
