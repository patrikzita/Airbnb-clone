import AppleIcon from "@mui/icons-material/Apple";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { Button, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { signIn } from "next-auth/react";

const SocialButtons = () => {
  const handleFacebookSignIn = () => {
    signIn("facebook");
  };

  const handleGoogleSignIn = () => {
    signIn("google");
  };

  const handleAppleSignIn = () => { };

  const handleEmailSignIn = () => { };

  return (
    <Stack spacing={2} direction="column">
      <Button
        variant="outlined"
        color="secondary"
        startIcon={<FacebookIcon sx={{ color: "#1877F2" }} />}
        onClick={handleFacebookSignIn}
      >
        <Typography sx={{ minWidth: "20ch" }}>
          Continue with Facebook
        </Typography>
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        startIcon={<GoogleIcon sx={{ color: "#4285F4" }} />}
        onClick={() => signIn("google")}
      >
        <Typography sx={{ minWidth: "20ch" }}>Continue with Google</Typography>
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        startIcon={<AppleIcon />}
        onClick={handleAppleSignIn}
      >
        <Typography sx={{ minWidth: "20ch" }}>Continue with Apple</Typography>
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        startIcon={<EmailIcon />}
        onClick={handleEmailSignIn}
      >
        <Typography sx={{ minWidth: "20ch" }}>Continue with email</Typography>
      </Button>
    </Stack>
  );
};

export default SocialButtons;
