import React from "react";
import {
  Modal,
  Fade,
  Box,
  Typography,
  IconButton,
  Backdrop,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  body?: React.ReactElement;
};

const ModalContainer = ({ isOpen, onClose, title, body }: ModalProps) => {
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
    borderRadius: "1rem",
  };
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
            {body}
          </Box>
          {
          // TODO: je potřeba toto změnit, protože u Airbnb Home, nepotřebuji tutu možnost, takže to nějak udělat jinak 
          }
          {isMobile && (
            <Box
              sx={{
                position: "absolute",
                width: "100%",
                bottom: 0
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
                <Button variant="contained" size="large">
                  Search
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalContainer;
