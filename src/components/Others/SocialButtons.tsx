import AppleIcon from "@mui/icons-material/Apple";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { Button, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";

const SocialButtons = () => {
  const handleSignIn = () => {
    toast.error(
      "For the simplicity of the app, it only works by logging in via google."
    );
  };

  const handleGoogleSignIn = () => {
    signIn("google");
  };
  return (
    <Stack spacing={2} direction="column">
      <Button
        variant="outlined"
        color="secondary"
        startIcon={<FacebookIcon sx={{ color: "#1877F2" }} />}
        onClick={handleSignIn}
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
        onClick={handleSignIn}
      >
        <Typography sx={{ minWidth: "20ch" }}>Continue with Apple</Typography>
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        startIcon={<EmailIcon />}
        onClick={handleSignIn}
      >
        <Typography sx={{ minWidth: "20ch" }}>Continue with email</Typography>
      </Button>
    </Stack>
  );
};

export default SocialButtons;
