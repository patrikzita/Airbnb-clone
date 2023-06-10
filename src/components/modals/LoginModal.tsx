import useRegisterModal from "@/hooks/useRegisterModal";
import CloseIcon from "@mui/icons-material/Close";
import { Divider, IconButton, useMediaQuery, useTheme } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import CountryPhoneNumberSelect from "../inputs/CountryNumberSelect";
import SocialButtons from "../Others/SocialButtons";

const LoginModal = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const modalStyle = {
    position: "absolute",
    top: isMobile ? "auto" : "50%",
    bottom: isMobile ? 0 : "auto",
    left: "50%",
    transform: isMobile ? "translateX(-50%)" : "translate(-50%, -50%)",
    width: isMobile ? "100%" : 568,
    height: isMobile ? "80vh" : "auto",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: isMobile ? 0 : "1rem",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  };

  const registerModal = useRegisterModal();
  return (
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
            <CountryPhoneNumberSelect />
            <Divider orientation="horizontal">
              <Typography>or</Typography>
            </Divider>
            <SocialButtons />
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default LoginModal;
