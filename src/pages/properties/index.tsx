import getCurrentUser from "@/actions/getCurrentUser";
import getUserRoomsData from "@/actions/getUserRoomsData";
import CarouselRoomCard from "@/components/rooms/RoomCard";
import { routes } from "@/config/siteConfig";
import useCountries from "@/hooks/useCountries";
import useRegisterModal from "@/hooks/useRegisterModal";
import { SafeRoom, SafeUser } from "@/types";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";
import StarRateIcon from "@mui/icons-material/StarRate";
import { Box, Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react"
import { toast } from "react-hot-toast";

type PropertyCardProps = {
  data: SafeRoom;
};

const PropertyRoomCard = ({ data }: PropertyCardProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onDelete = useCallback((id: string) => {
    setLoading(true);

    axios.delete(`/api/delete-room`, {
      params: { roomId: id }
    })
      .then(() => {
        toast.success('Listing deleted');
        router.refresh();
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error)
      })
      .finally(() => {
        setLoading(false);
      })
  }, [router]);

  return (
    <Box
      className="carouselCard"
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
          src={data.imageUrl}
          alt={data.title}
          placeholder="blur"
          blurDataURL={data.imagePlaceholder || "/public/placeholder.jpg"}
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
            {data.title}
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
      <Box sx={{
        display: "flex",
        justifyContent: "flex-end",
        flexDirection: { xs: "column", md: "row" },
        gap: 2, py: 2
      }}>
        <Button variant="contained" sx={{
          backgroundColor: "info.main"
        }}>Edit</Button>
        <Button variant="contained" sx={{
          backgroundColor: "error.main"
        }} disabled={loading} onClick={() => onDelete(data.id)}>Delete</Button>
      </Box>
    </Box>
  );
}

type PropertiesProps = {
  currentUser: SafeUser;
  userRooms: SafeRoom[]
};

const PropertiesPage = ({ currentUser, userRooms }: PropertiesProps) => {
  const registerModal = useRegisterModal();

  return (
    <>
      <Head>
        <title>Your lists - Properties - Airbnb</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Box
        component="main"
        sx={{
          minHeight: "80vh",
          py: 3
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "80%",
            marginInline: "auto",
            marginTop: "2rem",
            gap: 2,
          }}
        >
          <Typography variant="h4" component="h1">
            Manage My Properties
          </Typography>
          {currentUser ? (
            <>
              {userRooms ? (
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
                      <PropertyRoomCard
                        key={room.id}
                        data={room}
                      />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Box>
                  <Typography variant="h6" component="h2">
                    No properties found here.
                  </Typography>
                  <Typography component="p">
                    If you want to create a new propertie, click below
                  </Typography>
                </Box>
              )}
            </>
          ) : (
            <>
              <Box>
                <Typography variant="h6" component="h2">
                  Log in to view your wishlists
                </Typography>
                <Typography component="p">
                  You can create, view, or edit wishlists once you’ve logged in.
                </Typography>
              </Box>
              <Box>
                <Button
                  variant="contained"
                  size="large"
                  onClick={registerModal.onOpen}
                >
                  Log in
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </>
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
