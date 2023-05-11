import { CountryType, countries } from "@/utils/countries";
import CloseIcon from "@mui/icons-material/Close";
import {
  Autocomplete,
  Button,
  Divider,
  FormGroup,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import EmailIcon from "@mui/icons-material/Email";
import { signIn } from "next-auth/react";
import useRegisterModal from "@/hooks/useRegisterModal";


const CountrySelect = () => {
  const defaultCountry =
    countries.find((country) => country.code === "CZ") || null;
  const [selectedCountry, setSelectedCountry] = useState<CountryType | null>(
    defaultCountry
  );
  const handleCountryChange = (event: any, newValue: CountryType | null) => {
    setSelectedCountry(newValue);
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <FormGroup>
        <Autocomplete
          id="country-select"
          sx={{ width: "100%" }}
          options={countries}
          autoHighlight
          getOptionLabel={(option) => `${option.label} (+${option.phone})`}
          value={selectedCountry}
          onChange={handleCountryChange}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              <img
                loading="lazy"
                width="20"
                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                alt=""
              />
              {option.label} ({option.code}) +{option.phone}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose a country"
              variant="outlined"
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password",
              }}
            />
          )}
        />
        {selectedCountry && (
          <TextField
            label="Phone Number"
            variant="outlined"
            sx={{
              width: "100%",
              mt: 2,
              "& input[type=number]": {
                MozAppearance: "textfield",
              },
              "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                {
                  WebkitAppearance: "none",
                  margin: 0,
                },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  +{selectedCountry.phone}
                </InputAdornment>
              ),
            }}
            inputProps={{ type: "number" }}
          />
        )}
      </FormGroup>
      <Button
        variant="contained"
        sx={{
          width: "100%",
          borderRadius: 2,
          paddingY: 1,
        }}
      >
        Continue
      </Button>
    </Box>
  );
};

const SocialButtons = () => {
  const handleFacebookSignIn = () => {};

  const handleGoogleSignIn = () => {
    signIn("google");
  };

  const handleAppleSignIn = () => {};

  const handleEmailSignIn = () => {};

  return (
    <Stack spacing={2} direction="column">
      <Button
        variant="outlined"
        color="secondary"
        startIcon={<FacebookIcon sx={{ color: "#1877F2" }} />}
        onClick={handleFacebookSignIn}
      >
        Continue with Facebook
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        startIcon={<GoogleIcon sx={{ color: "#4285F4" }} />}
        onClick={() => signIn("google")}
      >
        Continue with Google
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        startIcon={<AppleIcon />}
        onClick={handleAppleSignIn}
      >
        Continue with Apple
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        startIcon={<EmailIcon />}
        onClick={handleEmailSignIn}
      >
        Continue with email
      </Button>
    </Stack>
  );
};

const LoginModal = () => {
  const modalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 568,
    bgcolor: "background.paper",
    borderRadius: "1rem",
    boxShadow: 24,
  };
  const registerModal = useRegisterModal();
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={registerModal.isOpen}
        onClose={registerModal.onClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={registerModal.isOpen}>
          <Box sx={modalStyle}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                bgcolor: "#f4f4f4",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                paddingInline: 1,
                paddingY: 2,
              }}
            >
              <IconButton onClick={registerModal.onClose}>
                <CloseIcon />
              </IconButton>
              <Typography
                variant="h6"
                component="h1"
                fontWeight={700}
                fontSize={16}
              >
                Log in or sign up
              </Typography>
              <div></div>
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
              <CountrySelect />
              <Divider orientation="horizontal">
                <Typography>or</Typography>
              </Divider>
              <SocialButtons />
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default LoginModal;
