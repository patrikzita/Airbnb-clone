import Loading from "@/components/shared/feedback/Loading";
import useRegisterModal from "@/hooks/useRegisterModal";
import { Box, Button, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import Head from "next/head";

const Wishlists = () => {
  const registerModal = useRegisterModal();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loading />;
  }
  return (
    <>
      <Head>
        <title>Wishlists - Airbnb</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/airbnb-icon.svg" />
      </Head>
      <main>
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
            Wishlists
          </Typography>
          {session ? (
            <>
              <Box>
                <Typography variant="h6" component="h2">
                  Create your first wishlist
                </Typography>
                <Typography component="p">
                  As you search, click the heart icon to save your favorite
                  places and Experiences to a wishlist.
                </Typography>
              </Box>
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
      </main>
    </>
  );
};

export default Wishlists;
