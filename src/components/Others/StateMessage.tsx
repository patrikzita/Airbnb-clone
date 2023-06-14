import useRegisterModal from "@/hooks/useRegisterModal";
import { Box, Typography, Button } from "@mui/material";

type StateMessageProps = {
  title?: string;
  subtitle?: string;
  showLoginButton?: boolean;
};

const StateMessage = ({
  title,
  subtitle,
  showLoginButton,
}: StateMessageProps) => {
  const registerModal = useRegisterModal();
  return (
    <Box
      component="main"
      sx={{
        minHeight: "80vh",
        py: 3,
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
          {title}
        </Typography>
        <Typography variant="subtitle2" component="p">
          {subtitle}
        </Typography>
        {showLoginButton && (
          <Box>
            <Button variant="contained" onClick={registerModal.onOpen}>
              Log in
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default StateMessage;
