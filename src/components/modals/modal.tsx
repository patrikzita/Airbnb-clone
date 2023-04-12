import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { IconButton, styled } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  title?: string;
  body?: React.ReactElement;
};

const ModalContainer = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
}: ModalProps) => {
  const modalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "1rem",
    boxShadow: 24,
  };
  return (
    <>
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
      >
        <Fade in={isOpen}>
          <Box sx={modalStyle}>
            <Box sx={{ display: "flex", justifyContent: "space-between", bgcolor: "#f4f4f4", borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" component="h1" fontWeight={800}>
                {title}
              </Typography>
              <div> </div>
            </Box>
            <Box>
              <Typography variant="h5" component="h2" fontWeight={900}>Welcome to Airbnb</Typography>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default ModalContainer;
