import CountryPhoneNumberSelect from "@/components/inputs/CountryNumberSelect";
import SocialButtons from "@/components/Others/SocialButtons";
import useIsMobile from "@/hooks/useIsMobile";
import { Box, Divider, Typography } from "@mui/material";
import Head from "next/head";

const Login = () => {
  const isMobile = useIsMobile();
  return (
    <>
      <Head>
        <title>AirBnb - Please login</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/airbnb-icon.svg" />
      </Head>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: isMobile ? 0 : "3rem",
        }}
        component="main"
      >
        <Box
          sx={{
            width: isMobile ? "100%" : 650,
            border: isMobile ? "none" : "1px solid grey",
            borderRadius: isMobile ? 0 : "1rem",
            bgcolor: "background.paper",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingInline: 1,
              paddingY: 2,
              borderBottom: "1px solid",
              borderColor: "grey.300",
            }}
          >
            <Typography
              variant="h6"
              component="h1"
              fontWeight={500}
              fontSize={16}
            >
              Log in or sign up
            </Typography>
          </Box>
          <Box
            sx={{
              p: 4,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography variant="h5" component="h2" fontWeight={500}>
              Welcome to Airbnb
            </Typography>
            <CountryPhoneNumberSelect />
            <Divider orientation="horizontal">
              <Typography>or</Typography>
            </Divider>
            <SocialButtons />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Login;
