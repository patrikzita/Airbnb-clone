import React from "react";
import {
  Modal,
  Fade,
  Box,
  Typography,
  IconButton,
  Backdrop,
  Button,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  body?: React.ReactElement;
  onSubmit?: () => void;
  onBack: () => void;
  onNext: () => void;
  step: number;
  totalSteps: number;
  mobileBar?: boolean;
  submitLabel?: string;
};

const ModalContainer = ({
  isOpen,
  onClose,
  title,
  body,
  onSubmit,
  onBack,
  onNext,
  step,
  totalSteps,
  mobileBar = false,
  submitLabel = "Search",
}: ModalProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const modalStyle = {
    position: "absolute",
    top: isMobile ? 0 : "50%",
    left: isMobile ? 0 : "50%",
    transform: isMobile ? "none" : "translate(-50%, -50%)",
    width: isMobile ? "100%" : 568,
    height: isMobile ? "100vh" : "auto",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: isMobile ? 0 : "1rem",
  };
  const mobileActionBar = (
    <Box
      sx={{
        position: "absolute",
        width: "100%",
        bottom: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          bgcolor: "grey.100",
          padding: 2,
          placeSelf: "flex-end",
        }}
      >
        <Button color="secondary">Clear all</Button>
        <Box sx={{ display: "flex", gap: 2 }}>
          {step > 0 && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={onBack}
              sx={{ width: "100%" }}
            >
              Back
            </Button>
          )}
          {step < totalSteps - 1 ? (
            <Button variant="contained" onClick={onNext} sx={{ width: "100%" }}>
              Next
            </Button>
          ) : (
            <Button variant="contained" onClick={onSubmit} sx={{ width: "100%" }}>
              {submitLabel}
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      disableEnforceFocus
    >
      <Fade in={isOpen}>
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
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="h1"
              fontWeight={700}
              fontSize={16}
            >
              {title}
            </Typography>
            <Box></Box>
          </Box>
          <Box
            sx={{
              p: 4,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {body}
            <Stack
              direction="row"
              gap={2}
              mt={2}
              sx={{
                display: mobileBar ? { xs: "none", sm: "flex" } : {xs: "flex", sm: "flex"},
              }}
            >
              {step > 0 && (
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={onBack}
                  sx={{ width: "100%" }}
                >
                  Back
                </Button>
              )}
              {step < totalSteps - 1 ? (
                <Button
                  variant="contained"
                  onClick={onNext}
                  sx={{ width: "100%" }}
                >
                  Next
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={onSubmit}
                  sx={{ width: "100%" }}
                >
                  {submitLabel}
                </Button>
              )}
            </Stack>
          </Box>
          {isMobile && mobileBar && mobileActionBar}
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalContainer;
